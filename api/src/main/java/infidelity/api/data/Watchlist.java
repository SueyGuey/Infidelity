package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Builder
@RequiredArgsConstructor
public class Watchlist {
    @Id
    @Column(nullable = false)
    private String watchlistId;
}
