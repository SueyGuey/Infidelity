package infidelity.api.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangingNumber {
    @Id
    @Column
    @Builder.Default
    private UUID numberId = UUID.randomUUID();

    public double value;
    public long lastUpdated;

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
