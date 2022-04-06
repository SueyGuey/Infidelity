package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @Column
    @Builder.Default
    private UUID portfolioId = UUID.randomUUID();

    private String name;
    @Builder.Default
    private double balance = 10000;

    @Builder.Default
    @OneToMany
    private List<Transaction> transactions = new ArrayList<>();

    @Builder.Default
    @OneToMany
    private Set<Asset> assets = new HashSet<>();
}
