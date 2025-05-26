import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Syllabus.css'; // Assuming you have some custom CSS here

const Syllabus = () => {
    // Define programs and their corresponding database names and number of semesters
    const programs = [
        { title: 'MSC (CA & IT) Integrated', dbName: 'ca_and_it', semesters: 10 },
        { title: 'BS in CS', dbName: 'bs', semesters: 8 },
        { title: 'MSC (IT)', dbName: 'it', semesters: 2 }, // Corrected semesters for IT based on backend config
        { title: 'PGDCA', dbName: 'pgdca', semesters: 2 },
    ];

    // State to manage which accordion item is currently open
    const [activeKey, setActiveKey] = useState(null);
    // State to store fetched syllabus data, keyed by programDb-semTable
    const [syllabusData, setSyllabusData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Scroll to the top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Function to fetch syllabus data for a specific program and semester
    const fetchSyllabusForSemester = async (programDb, semTable) => {
        const key = `${programDb}-${semTable}`; // Unique key for caching data
        if (syllabusData[key]) {
            // Data already fetched, no need to refetch
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.get(`http://localhost:8081/${programDb}/${semTable}/syllabus`);
            if (response.data.success) {
                setSyllabusData(prevData => ({
                    ...prevData,
                    [key]: response.data.data
                }));
            } else {
                setError(`Failed to fetch data for ${programDb.toUpperCase()} - ${semTable.toUpperCase()}: ${response.data.message}`);
            }
        } catch (err) {
            console.error(`Error fetching syllabus for ${programDb} - ${semTable}:`, err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(`Error fetching data: ${err.response.data.message}`);
            } else {
                setError(`An error occurred while fetching data for ${programDb.toUpperCase()} - ${semTable}. Please ensure the backend is running and the table exists.`);
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle accordion item click
    const handleAccordionSelect = (eventKey) => {
        // eventKey will now be a string (the key of the item being opened)
        // or null (if the currently open item is clicked to close it).
        setActiveKey(eventKey); // Set the active key directly

        if (eventKey) { // Only proceed if an item is being opened (eventKey is not null)
            const [programIndex, semIndex] = eventKey.split('-').map(Number);
            const program = programs[programIndex];
            const semTable = `sem${semIndex + 1}`;
            fetchSyllabusForSemester(program.dbName, semTable);
        }
    };

    // Placeholder for Syllabus PDF button click
    const handleSyllabusPdfClick = (programTitle, semNumber) => {
        // In a real application, you would implement logic here to generate or fetch a PDF.
        // This might involve another API call to your backend.
        alert(`Generating Syllabus PDF for ${programTitle}, Semester ${semNumber}... (Functionality to be implemented)`);
    };

    return (
        <Container fluid="md" className="py-4" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Row className="justify-content-center"> {/* Center the cards */}
                {programs.map((program, programIndex) => (
                    <Col md={5} key={programIndex} className="mb-4 d-flex"> {/* Use d-flex to make cards equal height */}
                        <Card className="shadow-lg border-0 bg-light flex-fill" style={{ backgroundColor: '#ffffff', borderRadius: '15px' }}>
                            <Card.Body>
                                <Container className='ml-5'>
                                    <h4 className="text-center mb-3" style={{ fontWeight: 'bold' }}>{program.title}</h4>
                                    {/* REMOVED alwaysOpen PROP to ensure eventKey is a string */}
                                    <Accordion activeKey={activeKey} onSelect={handleAccordionSelect} className="semester-accordion bg-light ml-5">
                                        {Array.from({ length: program.semesters }, (_, semIndex) => {
                                            const eventKey = `${programIndex}-${semIndex}`;
                                            const semTable = `sem${semIndex + 1}`;
                                            const currentSyllabus = syllabusData[`${program.dbName}-${semTable}`];

                                            return (
                                                <Accordion.Item className='bg-light' eventKey={eventKey} key={eventKey}>
                                                    <Accordion.Header>
                                                        Semester {semIndex + 1}
                                                    </Accordion.Header>
                                                    <Accordion.Body className='bg-light'>
                                                        {loading && activeKey === eventKey ? (
                                                            <div className="text-center">
                                                                <Spinner animation="border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </Spinner>
                                                            </div>
                                                        ) : error && activeKey === eventKey ? (
                                                            <Alert variant="danger">{error}</Alert>
                                                        ) : currentSyllabus && currentSyllabus.length > 0 ? (
                                                            <div className="table-responsive">
                                                                <Table striped bordered hover size="sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Subject Name</th>
                                                                            <th>Subject Code</th>
                                                                            {/* REMOVED: Last Updated column header */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {currentSyllabus.map((item, itemIndex) => (
                                                                            <tr key={itemIndex}>
                                                                                <td>{item.SubjectName}</td>
                                                                                <td>{item.SubjectCode}</td>
                                                                                {/* REMOVED: Last Updated column data */}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                                {/* NEW: Syllabus PDF Button */}
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        className="btn btn-info rounded-pill"
                                                                        onClick={() => handleSyllabusPdfClick(program.title, semIndex + 1)}
                                                                    >
                                                                        Syllabus PDF
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-muted">No course details available for Semester {semIndex + 1}.</p>
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            );
                                        })}
                                    </Accordion>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Syllabus;
