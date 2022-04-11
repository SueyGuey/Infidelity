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

/**
 * ChangingNumber is a number that can change over time. It is used to track the price of tradeable assets,
 * the volume of a stock, the value of a portfolio, etc.
 * Each ChangingNumber has a unique ID, a value, and a timestamp. ChangingNumber is mutable, so it can be
 * updated with new values.
 */
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangingNumber {
    @Id
    @Column
    private String numberId;

    public double value;
    public long lastUpdated;

    /**
     * Whether the number is up-to-date within the given time window.
     * @param within The time window in milliseconds.
     */
    public boolean upToDate(long within) {
        long now = DateTime.now().getMillis();
        return now - lastUpdated < within;
    }

    /**
     * Whether the number is up-to-date within the default time window, which is 1 second.
     */
    public boolean upToDate() {
        return upToDate(1000);
    }

    /**
     * Updates the number with the given value. If the number is not up-to-date, the update is ignored.
     * @param newValue The new value.
     * @param timestamp The time which corresponds to the new value.
     * @return Whether the update was successful.
     */
    public boolean update(double newValue, long timestamp) {
        if (timestamp <= lastUpdated) {
            return false;
        }
        value = newValue;
        lastUpdated = timestamp;
        return true;
    }

    /**
     * Updates the number with the given value at the current time.
     * @param newValue The new value.
     * @return Whether the update was successful. This function should always return true if
     * the default time window is reasonable.
     */
    public boolean update(double newValue) {
        long now = DateTime.now().getMillis();
        return update(newValue, now);
    }
}
