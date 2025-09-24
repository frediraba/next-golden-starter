import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

// Suitsutest: kontrolli, et avalehe komponent renderdub ja mingi tekst on nähtav
it("renders home content", () => {
  render(<Home />);
  // Nexti vaikimisi lehel on tavaliselt "Learn" või "Next" – vabalt võib muutuda,
  // seega võtame paindliku regexi.
  expect(screen.getByText(/next|welcome|learn/i)).toBeInTheDocument();
});
