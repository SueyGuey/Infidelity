package infidelity.api.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;
import java.util.UUID;

/**
 * NumberHistory is used to store the history of a ChangingNumber in the database.
 */
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NumberHistory {
    @Id
    @Column(nullable = false)
    @Builder.Default
    private UUID numberHistoryId = UUID.randomUUID();;

    /**
     * It uses a TreeMap to store each known value of the number in chronological order.
     * The key of the map is the timestamp of the value, and the value is the value itself.
     * The map is sorted by the key, so the first entry is the oldest value.
     */
    @Builder.Default
    @ElementCollection
    private NavigableMap<Long, Double> data = new TreeMap<>();

    /**
     * Search for the closest value to the given timestamp. If the timestamp is before the first
     * value in the map, return the first value. If the timestamp is after the last value in the
     * map, return the last value. If the timestamp is between two values, return the value
     * that is closest to the given timestamp.
     * @param timestamp the time at which the caller wants to receive data, in milliseconds
     * @return the closest timestamp to the given timestamp, and the value at that timestamp
     */
    public Pair<Long, Double> findValueAt(long timestamp) {
        Long floorKey = data.floorKey(timestamp);
        Long ceilingKey = data.ceilingKey(timestamp);
        // If the timestamp is before the first value, return the first value
        if (floorKey == null) {
            return Pair.of(data.firstEntry().getKey(), data.firstEntry().getValue());
        }
        // If the timestamp is after the last value, return the last value
        if (ceilingKey == null) {
            return Pair.of(data.lastEntry().getKey(), data.lastEntry().getValue());
        }
        // If the timestamp is between two values, return the value that is closest to the given timestamp
        if (Math.abs(timestamp - floorKey) < Math.abs(timestamp - ceilingKey)) {
            return Pair.of(floorKey, data.get(floorKey));
        } else {
            return Pair.of(ceilingKey, data.get(ceilingKey));
        }
    }
}
