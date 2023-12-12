import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const About = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box sx={{ flexGrow: 1, m: 2, display: "flex", alignItems: "start", justifyContent: "center" }}>
			<Grid
				container
				spacing={2}
				sx={{
					display: "flex",
					alignItems: "start",
					justifyContent: "center",
					maxWidth: "1400px",
					margin: "auto",
				}}
			>
				<Grid item xs={12} md={6}>
					<img
						src="/logo.png"
						alt="logo"
						style={{
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
							width: isSmallScreen ? "50%" : "75%",
							height: "auto",
							objectFit: "contain",
						}}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "start",
					}}
				>
					<Typography variant="h3" fontWeight="700" textAlign={isSmallScreen ? "center" : "justify"} component="h3" gutterBottom>
						Tentang Kami
					</Typography>
					<Typography variant="subtitle1" gutterBottom sx={{ textAlign: isSmallScreen ? "justify" : "inherit" }}>
						CarHoter, sebagai penyedia jasa sewa atau rental mobil terkemuka di Indonesia, hadir dengan beragam pilihan kendaraan yang dapat disewa untuk memenuhi berbagai
						keperluan Anda. Tak hanya untuk keperluan pribadi, tetapi juga tersedia untuk kebutuhan bisnis atau acara khusus Anda. Dengan fokus pada layanan profesional yang unggul
						dan harga yang sangat kompetitif, kami berkomitmen sepenuh hati untuk memberikan pengalaman sewa mobil yang tak tertandingi, memastikan kepuasan pelanggan menjadi
						prioritas utama kami.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default About;
