'use client';

import DesktopSidebar from './DesktopSidebar';
import MobileNav from './MobileNav';

export default function ResponsiveNav() {
	return (
		<>
			{/* Mobile Navigation (< lg) */}
			<div className="lg:hidden">
				<MobileNav />
			</div>

			{/* Desktop Sidebar (>= lg) */}
			<div className="hidden lg:block">
				<DesktopSidebar />
			</div>
		</>
	);
}
