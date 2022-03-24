package infidelity.api.data;

import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @Column(nullable = false)
    private UUID portfolioId;

    private String name;
    private double balance;

    @Builder.Default
    @OneToMany
    private List<Transaction> transactions = new ArrayList<>();

    @Builder.Default
    @OneToMany
    private Set<Asset> assets = new HashSet<>();
}
