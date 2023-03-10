import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from 'react-bootstrap';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/issues">Issue 조회</Nav.Link>
            <Nav.Link href="/new">Issue 등록</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;