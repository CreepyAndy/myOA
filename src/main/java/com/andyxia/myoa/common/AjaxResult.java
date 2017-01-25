package com.andyxia.myoa.common;

import java.io.Serializable;

public class AjaxResult implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 454533799320390837L;
	public static final Integer AJAX_STATUS_CODE_SUCCESS=0;
	public static final Integer AJAX_STATUS_CODE_WARN=1;
	public static final Integer AJAX_STATUS_CODE_ERROR=2;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	private int statusCode;
	private String message;
	
	public static AjaxResult success(){
		AjaxResult ajaxResult = new AjaxResult();
		ajaxResult.setStatusCode(AjaxResult.AJAX_STATUS_CODE_SUCCESS);
		ajaxResult.setMessage("操作成功");
		return ajaxResult;
	}
	public static AjaxResult warn(){
		AjaxResult ajaxResult = new AjaxResult();
		ajaxResult.setStatusCode(AjaxResult.AJAX_STATUS_CODE_WARN);
		return ajaxResult;
	}
	public static AjaxResult error(){
		AjaxResult ajaxResult = new AjaxResult();
		ajaxResult.setStatusCode(AjaxResult.AJAX_STATUS_CODE_ERROR);
		return ajaxResult;
	}
	public AjaxResult(Integer statusCode,String message){
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
	public AjaxResult(){
		super();
	}
	
	
}
