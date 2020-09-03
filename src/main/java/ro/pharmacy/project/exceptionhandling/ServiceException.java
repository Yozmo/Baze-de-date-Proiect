package ro.pharmacy.project.exceptionhandling;

import java.io.Serializable;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class ServiceException extends Exception implements Serializable {
	private static final long serialVersionUID = 3052876498423496349L;
	
	public ServiceException(final String message) {
		super(message);
	}

	public ServiceException(final Throwable cause) {
		super(cause);
	}

	public ServiceException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
