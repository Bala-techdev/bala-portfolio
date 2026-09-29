package com.balatechdev.portfolio.common.exception;

// Used when a request clashes with existing data, e.g. a slug that is already taken.
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}