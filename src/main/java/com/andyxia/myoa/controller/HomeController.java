package com.andyxia.myoa.controller;


import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HomeController {
	@RequestMapping("/welcome") 
	public ModelAndView helloWorld(HttpSession session) {
		String message = "<br><div style='text-align:center;'>"
				+ "<h3>********** Hello World, Spring MVC Tutorial</h3>This message is coming from CrunchifyHelloWorld.java **********</div><br><br>";
		ModelAndView view = new ModelAndView("main","message",message);
		return view;
	}
	@RequestMapping("/admin") 
	public ModelAndView admin(HttpSession session) {
		String message = "<br><div style='text-align:center;'>"
				+ "<h3>********** Hello World, Spring MVC Tutorial</h3>This message is SECURITY !!!!! **********</div><br><br>";
		ModelAndView view = new ModelAndView("main","message",message);
		return view;
	}
	@RequestMapping("/confidential") 
	public ModelAndView confidential(HttpSession session) {
		String message = "<br><div style='text-align:center;'>"
				+ "<h3>********** Hello World, Spring MVC Tutorial</h3>This message is confidential !!!!! **********</div><br><br>";
		ModelAndView view = new ModelAndView("main","message",message);
		return view;
	}
}
