import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TopMenu from "./TopMenu";
import googleAuth from "../config/googleAuth";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [user, setUser] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, [auth]);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Error signing out", error);
		}
	};

	return (
		<AppBar position="sticky" style={{ backgroundColor: "white", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)" }}>
			<Toolbar>
				<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
					<img src="/logo.png" alt="logo" width={100} height={"auto"} style={{ objectFit: "contain" }} />
					{!isMobile && (
						<Box sx={{ flexGrow: 1 }}>
							<TopMenu />
						</Box>
					)}
					<Box>
						{user ? (
							<Box display="flex" alignItems="center" justifyContent="center">
								<Typography variant="subtitle1" style={{ color: "black", marginRight: theme.spacing(2), fontSize: "1rem" }}>
									Hai, <strong>{user.displayName}</strong>
								</Typography>
								<Button title="Sign Out" color="error" variant="contained" startIcon={<ExitToAppIcon />} sx={{ textTransform: "none" }} onClick={handleSignOut} />
							</Box>
						) : (
							<Button title="Sign In" color="primary" variant="outlined" startIcon={<GoogleIcon />} sx={{ textTransform: "none" }} onClick={googleAuth}>
								Sign In
							</Button>
						)}
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
