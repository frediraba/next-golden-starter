import Container from './Container';
export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <Container className="py-6 text-sm opacity-70">
        © {new Date().getFullYear()} Next Golden Starter
      </Container>
    </footer>
  );
}
