package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Watchlist {
    @Id
    @Column(nullable = false)
    @Builder.Default
    private UUID watchlistId = UUID.randomUUID();;

    private String name;

    @Builder.Default
    @ManyToMany
    private List<Tradeable> items = new ArrayList<>();
}
