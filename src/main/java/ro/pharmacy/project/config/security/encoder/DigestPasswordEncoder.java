package ro.pharmacy.project.config.security.encoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.codec.Utf8;
import org.springframework.security.crypto.password.PasswordEncoder;

public class DigestPasswordEncoder implements PasswordEncoder {
	@Override
	public String encode(CharSequence rawPassword) {
		return digest(rawPassword);
	}

	private String digest(CharSequence rawPassword) {
		MessageDigest messageDigest = createDigest("SHA-256");
		byte[] digest = messageDigest.digest(Utf8.encode(rawPassword));
		return new String(Hex.encode(digest));
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		String rawPasswordEncoded = digest(rawPassword);
		return rawPasswordEncoded.equals(encodedPassword);
	}

	private static MessageDigest createDigest(String algorithm) {
		try {
			return MessageDigest.getInstance(algorithm);
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No such hashing algorithm", e);
		}
	}

}
