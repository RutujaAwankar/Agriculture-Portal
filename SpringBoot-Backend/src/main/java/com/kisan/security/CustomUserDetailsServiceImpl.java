package com.kisan.security;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kisan.pojo.UserEntity;
import com.kisan.repository.UserEntityRepository;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
//depcy
	@Autowired
	private UserEntityRepository userEntityRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// invoke dao' s method
		UserEntity userEntity = userEntityRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email not found !!!!!"));
		return new CustomUserDetailsImpl(userEntity);
	}

}
