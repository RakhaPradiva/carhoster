import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, TextField, Typography, InputAdornment } from "@mui/material";
import { Button } from "@mui/joy";
import { Search, Mic } from "@mui/icons-material";
import CarList from "../components/CarList";
import { auth } from "../config/firebaseConfig";

const Car = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user && user.email === "rakhapradiva.dev@gmail.com") {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
		});

		return unsubscribe;
	}, []);

	const handleSearch = (event) => {
		event.preventDefault();
		setSearchQuery(event.target.value);
	};

	const handleVoiceSearch = () => {
		const recognition = new window.webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		let timeoutId = null;

		recognition.onresult = (event) => {
			const transcript = event.results[event.results.length - 1][0].transcript;
			setSearchQuery(transcript);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				recognition.stop();
				handleSearch(event.results[event.results.length - 1][0].transcript);
			}, 4000);
		};

		recognition.start();
	};

	return (
		<Box>
			<form onSubmit={handleSearch}>
				<Grid paddingX={5} paddingY={2} container spacing={2} alignItems="center">
					<Grid item xs={12} sm={4}>
						<Typography variant="h4" fontWeight="bold">
							Car
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							placeholder="Cari Mobil"
							variant="outlined"
							fullWidth
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Box sx={{ display: "flex" }}>
											<Button onClick={handleVoiceSearch} variant="outlined">
												<Mic />
											</Button>
											<Button type="submit" variant="text">
												<Search />
											</Button>
										</Box>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					{isAdmin && (
						<Grid item xs={12} sm={4}>
							<Button variant="solid" size="lg" component={Link} to="/addcar">
								Add Car
							</Button>
						</Grid>
					)}
				</Grid>
			</form>
			<CarList searchQuery={searchQuery} />
		</Box>
	);
};

export default Car;
