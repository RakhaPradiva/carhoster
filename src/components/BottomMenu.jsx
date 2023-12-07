import { useState, useEffect, useMemo } from "react";
import { BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MailIcon from "@mui/icons-material/Mail";

const BottomMenu = () => {
	const [value, setValue] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const location = useLocation();

	const menuItems = useMemo(
		() => [
			{ label: "Home", icon: <HomeIcon />, path: "/" },
			{ label: "Car", icon: <DirectionsCarIcon />, path: "/car" },
			{ label: "Contact", icon: <MailIcon />, path: "/contact" },
		],
		[]
	);

	useEffect(() => {
		const newValue = menuItems.findIndex((item) => item.path === location.pathname);

		setValue(newValue === -1 ? 0 : newValue);
	}, [location, menuItems]);

	if (!isMobile) {
		return null;
	}

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			style={{
				position: "fixed",
				bottom: 0,
				width: "100%",
				boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
				backgroundColor: "white",
			}}
		>
			{menuItems.map((item) => (
				<BottomNavigationAction key={item.label} label={item.label} icon={item.icon} component={Link} to={item.path} />
			))}
		</BottomNavigation>
	);
};

export default BottomMenu;
