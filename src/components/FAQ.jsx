import { useState } from "react";
import { Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, ClickAwayListener } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../constants";

const FAQ = () => {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleClickAway = () => {
		setExpanded(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box sx={{ flexGrow: 1, marginX: 2, marginY: 8 }}>
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12}>
						<Typography variant="h4" component="h4" fontWeight="700" gutterBottom align="center">
							FAQ
						</Typography>
					</Grid>
					<Grid item xs={12} md={8}>
						{faqs.map((faq, index) => (
							<Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon sx={{ color: "white", fontSize: 50 }} />}
									aria-controls={`faq-content-${index}`}
									id={`faq-header-${index}`}
									sx={{
										backgroundColor: "primary.main",
										color: "white",
									}}
								>
									<Typography variant="h6">{faq.title}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>{faq.description}</Typography>
								</AccordionDetails>
							</Accordion>
						))}
					</Grid>
				</Grid>
			</Box>
		</ClickAwayListener>
	);
};

export default FAQ;
