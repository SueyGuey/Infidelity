package infidelity.api.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChangingNumber {
    @Id
    @Column(nullable = false)
    private UUID numberId;

    public double value;
    public long lastUpdated;

    public ChangingNumber(double val, long timestamp) {
        value = val;
        lastUpdated = timestamp;
    }

    public boolean upToDate(long within) {
        long now = DateTime.now().getMillis();
        return now - lastUpdated < within;
    }

    public boolean upToDate() {
        return upToDate(1000);
    }

    public boolean update(double newValue, long timestamp) {
        if (timestamp <= lastUpdated) {
            return false;
        }
        value = newValue;
        lastUpdated = timestamp;
        return true;
    }

    public boolean update(double newValue) {
        long now = DateTime.now().getMillis();
        return update(newValue, now);
    }
}
