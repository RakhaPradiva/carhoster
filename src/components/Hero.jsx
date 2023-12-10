import { Box, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
				padding: "5% 10%",
			}}
		>
			<Box
				sx={{
					flex: "1",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "start",
					gap: "1rem",
				}}
			>
				<Typography variant="h1" color="black" fontWeight="bold" sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}>
					Welcome to <span style={{ color: "#2B59FF" }}>CarHoster</span>
				</Typography>
				<Typography variant="h5" sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", lineHeight: 1.2 } }}>
					Sederhanakan pengalaman penyewaan mobil Anda dengan proses pemesanan kami yang mudah.
				</Typography>
				<Button
					variant="solid"
					size="lg"
					onClick={() => {
						navigate("/car");
					}}
				>
					Lihat Mobil
				</Button>
			</Box>
			<Box
				sx={{
					flex: "1",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
				}}
			>
				<img src="/hero-blob.svg" alt="hero blob" style={{ position: "absolute", top: "-10%", left: "0", width: "100%", height: "100%", zIndex: "-1" }} />
				<img src="/hero-img.png" alt="Car" style={{ width: "100%", objectFit: "contain", position: "relative", zIndex: "-1", transform: "scale(1)" }} />
			</Box>
		</Box>
	);
};

export default Hero;
