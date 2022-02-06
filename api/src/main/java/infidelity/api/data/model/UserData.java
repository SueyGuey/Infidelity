package infidelity.api.data.model;

import lombok.*;

/**
 * JSON-friendly data object that can be thrown to the frontend representing a single user.
 * Can only contain valid JSON datatypes: Integers, Strings, Booleans, arrays, objects (JSON Object).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserData {
    @NonNull
    private String id;
    private String email;
}
