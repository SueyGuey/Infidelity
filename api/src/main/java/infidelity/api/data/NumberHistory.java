package infidelity.api.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NumberHistory {
    @Id
    @Column(nullable = false)
    @Builder.Default
    private UUID numberHistoryId = UUID.randomUUID();;

    @Builder.Default
    @ElementCollection
    private Map<Long, Double> data = new TreeMap<>();

    /**
     * TODO: implement this function
     * TODO: add additional return value indicating the accuracy of the response
     *       as measured by distance to the closest datapoint
     * @param timestamp the time at which the caller wants to receive data, in milliseconds
     */
    public double findValueAt(long timestamp) {
        return 0.0;
    }
}
