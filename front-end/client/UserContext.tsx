'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Backend } from './TransClient';
import { UserProfileResponse } from './Users.dto';

interface UserContextType {
	user: UserProfileResponse | null;
	isLoading: boolean;
	refreshUser: () => Promise<void>;
	updateUser: (updatedUser: UserProfileResponse) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserProfileResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const logout = useCallback(() => {
		if (isLoggingOut) return; // Éviter les appels multiples
		setIsLoggingOut(true);
		localStorage.removeItem('access_token');
		setUser(null);
		if (typeof window !== 'undefined') {
			window.location.href = '/auth/login';
		}
	}, [isLoggingOut]);

	const refreshUser = useCallback(async () => {
		if (isLoggingOut) {
			setIsLoading(false);
			return;
		}
		
		const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
		if (!token) {
			setUser(null);
			setIsLoading(false);
			return;
		}

		try {
			const client = Backend.getInstance();
			const result = await client.me.get();
			if (result.ok) {
				const data = typeof result.value === 'string'
					? JSON.parse(result.value) as UserProfileResponse
					: result.value as UserProfileResponse;
				setUser(data);
			} else {
				logout();
			}
		} catch (err) {
			logout();
		} finally {
			setIsLoading(false);
		}
	}, [logout, isLoggingOut]);

	const updateUser = useCallback((updatedUser: UserProfileResponse) => {
		setUser(updatedUser);
	}, []);

	useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	return (
		<UserContext.Provider value={{ user, isLoading, refreshUser, updateUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
