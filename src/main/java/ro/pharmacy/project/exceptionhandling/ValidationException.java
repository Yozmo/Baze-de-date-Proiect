package ro.pharmacy.project.exceptionhandling;

import java.io.Serializable;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ValidationException extends Exception implements Serializable {
	private static final long serialVersionUID = 7288415726715382103L;
	
	public ValidationException(String message) {
		super(message);
	}
	
	public ValidationException(final Throwable cause) {
		super(cause);
	}
	
	public ValidationException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
