import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './Courses.css';

function Courses() {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top on page load
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='bg-light'>
            <Navbar />
            <Container className="bg-light">
                <Row>
                    <Col md={6} className="mb-3">
                        <Card bg="light" text="dark" style={{ minHeight: "420px" }} className="p-3 shadow-sm">
                            <span className='mx-auto' style={{ textDecoration: 'underline' }}><strong>MSC (CA & IT) Integrated</strong></span>
                          <Card.Text className='mt-4'>
                                The M.Sc. (Computer Applications & IT) program is a highly sought-after
                                course, focusing on cutting-edge technologies and industry-oriented
                                learning. It equips students with essential skills to thrive in
                                today's fast-evolving tech landscape.
                            </Card.Text>
                            <Card.Text>
                                The curriculum covers software development, cloud computing, AI,
                                cybersecurity, and data science, ensuring a strong foundation in
                                both core concepts and emerging trends. Specialized electives like
                                Machine Learning, Blockchain, IoT, and Full-Stack Development align
                                with industry demands.
                            </Card.Text>
                            <Card.Text>
                                Regular curriculum updates integrate the latest advancements,
                                maintaining relevance in the IT sector. With a balance of theory and
                                hands-on practice, the program fosters innovation, research, and
                                professional excellence, ensuring graduates are industry-ready from
                                day one.
                            </Card.Text>
                            <ul>
                                <li>Intake : 80</li>
                                <li>Under and Post Graduate</li>
                                <li>5 year Program</li>
                                <li>
                                    Eligibility: HSC or 10+2 in Science or Commerce stream from a
                                    recognized board with minimum 40% marks.
                                </li>
                            </ul>
                          <Button variant="warning" size="sm" className="text-dark" onClick={() => navigate('/syllabus')}>
                                View Syllabus
                            </Button>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Card bg="light" text="dark" style={{ minHeight: "420px" }} className="p-3 shadow-sm">
                            <span className='mx-auto' style={{ textDecoration: 'underline' }}><strong>MSC (IT)</strong></span>
                             <Card.Text className='mt-4'>
                                The M.Sc. (Information Technology) program offers in-depth knowledge
                                of Cloud Computing, Cybersecurity, AI, Machine Learning, Blockchain,
                                and Advanced Web Technologies. It combines theoretical foundations
                                with hands-on experience to ensure students are industry-ready.
                            </Card.Text>
                            <Card.Text>
                                With a strong focus on research and practical software development,
                                students gain expertise in data science, and cybersecurity through
                                real-world projects in advanced labs.
                            </Card.Text>
                            <Card.Text>
                                Emphasizing Information Security and Emerging Technologies, the
                                curriculum is regularly updated to match industry trends. Through
                                internships, live projects, and expert mentorship, the program
                                fosters innovation, problem-solving, and technical excellence,
                                preparing graduates for impactful careers in tech firms, research
                                institutions, and startups.
                            </Card.Text>
                            <ul>
                                <li className='mt-4'>Intake : 60</li>
                                <li>Post Graduate</li>
                                <li>2 year Program</li>
                                <li>
                                    Eligibility: BCA, B.Sc. (IT), B.Tech. (IT/CE/CSE) degree from
                                    recognized university with minimum 40% marks.
                                </li>
                            </ul>
                            <Button variant="warning" size="sm" className="text-dark ">
                                View Syllabus
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <Card bg="light" text="dark" style={{ minHeight: "420px" }} className="p-3 shadow-sm">
                            <span className='mx-auto' style={{ textDecoration: 'underline' }}><strong>PGDCA</strong></span>
                              <Card.Text className='mt-4'>
                              The Post Graduate Diploma in Computer Applications (PGDCA) is a one-year program offering specialized knowledge in Computer Science, open to graduates from any stream. It provides a strong foundation in programming, software development, DBMS, and cybersecurity.
                            </Card.Text>
                            <Card.Text className='mt-2'>
                                Students gain hands-on experience in full-stack development, cloud computing, AI, and data analytics, preparing them for careers as System Analysts, Software Developers, Database Admin, and IT Consultants.
                            </Card.Text>
                            <Card.Text className='mt-2'>
                               With an industry-aligned curriculum, PGDCA also serves as a pathway for higher studies like MCA and M.Sc. (IT). The program ensures graduates are job-ready with modern tech skills, making them highly sought-after in today's digital era.
                            </Card.Text>
                            <ul>
                                <li className='mt-5'>Intake : 60</li>
                                <li>Post Graduate</li>
                                <li>1 year Program</li>
                                <li>
                                    Eligibility: Graduate degree from a recognized university with minimum 40% marks.

                                </li>
                            </ul>
                            <Button variant="warning" size="sm" className="text-dark">
                                View Syllabus
                            </Button>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Card bg="light" text="dark" style={{ minHeight: "420px" }} className="p-3 shadow-sm">
                            <span className='mx-auto' style={{ textDecoration: 'underline' }}><strong>BS in CS</strong></span>
                           <Card.Text className='mt-4'>
                                The Bachelor of Science in Computer Science (B.Sc. CS) is an NEP 2024-based undergraduate program that equips students with fundamental and advanced computing skills. The curriculum covers programming, algorithms, software development, AI, cybersecurity, cloud computing, and blockchain, ensuring a strong theoretical and practical foundation.


                            </Card.Text>
                            <Card.Text>
                               Students gain hands-on experience through real-world projects, coding labs, and internships, preparing them for careers in software development, data science, cybersecurity, and IT consulting. The program fosters problem-solving, innovation, and analytical thinking, essential for success in the tech industry.


                            </Card.Text>
                            <Card.Text>
                               With an industry-aligned curriculum and opportunities for research, certifications, and specialization in emerging technologies, graduates are well-prepared for higher studies (M.Sc. CS, MCA) or direct employment in tech companies, startups, and government organizations.


                            </Card.Text>
                            <ul>
                                <li>Intake : 60</li>
                                <li>Under Graduate</li>
                                <li>4 year Program</li>
                                <li>
                                   Eligibility: HSC or 10+2 in Science or Commerce stream from a recognized board with minimum 40% marks.

                                </li>
                            </ul>
                            <Button variant="warning" size="sm" className="text-dark mt-1">
                                View Syllabus
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <Card bg="light" text="dark" style={{ minHeight: "420px" }} className="p-3 shadow-sm">
                            <span className='mx-auto' style={{ textDecoration: 'underline' }}><strong>PHD</strong></span>
                            <Card.Text className='mt-1'>
                             The Ph.D. in Computer Science is a research-driven program for those passionate about technology, innovation, and problem-solving. It covers advanced computing, AI, machine learning, cybersecurity, blockchain, quantum computing, and data science, preparing scholars for impactful contributions in academia, industry, and research.


                            </Card.Text>
                            <Card.Text>
                                Doctoral candidates conduct original research, collaborate across disciplines, and publish in top journals, addressing real-world computing challenges. With access to cutting-edge labs, high-performance computing, and expert mentorship, they develop groundbreaking solutions.


                            </Card.Text>
                            <Card.Text>
                             Graduates pursue careers as research scientists, university professors, AI specialists, data architects, and tech leaders, driving technological advancements in industry and academia worldwide.
                            </Card.Text>
                            <ul>
                                <li>Intake depends on exam
</li>
                                <li>Doctrate</li>
                                <li>3 to 6 year</li>
                                <li>
                                    Eligibility: Masters degree from a recognized university with minimum 60% marks.

                                </li>
                            </ul>
                            <Button variant="warning" size="sm" className="text-dark">
                                View Syllabus
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Courses;
