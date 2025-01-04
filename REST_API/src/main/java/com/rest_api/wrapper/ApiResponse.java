package com.rest_api.wrapper;

public class ApiResponse<T> {

    private String status;    // npr. OK, Not Found, itd.
    private String message;   // dodatna poruka
    private T response;       // podatak ili null

    public ApiResponse() {}

    public ApiResponse(String status, String message, T response) {
        this.status = status;
        this.message = message;
        this.response = response;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getResponse() {
        return response;
    }

    public void setResponse(T response) {
        this.response = response;
    }

}