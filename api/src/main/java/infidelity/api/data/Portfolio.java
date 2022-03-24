package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @Column(nullable = false)
    private String portfolioId;

    private String name;
    private double balance;

    @Builder.Default
    @OneToMany
    private List<Transaction> transactions = new ArrayList<>();
}
