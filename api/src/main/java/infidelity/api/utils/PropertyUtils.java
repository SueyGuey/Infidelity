package infidelity.api.utils;

import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Function;

public class PropertyUtils {

    /**
     * Sets a property value in <tt>entity</tt> while checking the old vs new value, so the return value can indicate
     * whether the property value in fact changed as a result of setting it in this method.
     * @return true if value was changed, false if <tt>newValue</tt> reflects the current property value already
     */
    public static <M, T> boolean updateProperty(M entity, Function<M, T> getter, Consumer<T> setter, T newValue) {
        T oldValue = getter.apply(entity);
        setter.accept(newValue);

        // return true if we changed, false if not
        return !Objects.equals(oldValue, newValue);
    }

    private PropertyUtils() {
        // static only
    }
}
