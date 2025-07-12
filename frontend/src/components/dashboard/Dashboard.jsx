import { use, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Container, Col, Row, Form, Card, Button } from 'react-bootstrap';
import ModalMessage from "../ModalMessage";
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {

    const[ticker, setTicker] = useState();
    const [loading, setLoading] = useState(false);
    const [show_modal, setShowModal] = useState({
        'modal': false,
        'title': '',
        'message': ''
    });
    const [plot, setPlot] = useState();
    const [ma100, setMA100] = useState();
    const [prediction, setPrediction] = useState();
    const [mse, setMSE] = useState();
    const [rmse, setRMSE] = useState();
    const [r2, setR2] = useState();

    useEffect(() => {
        const fetch_protected_data = async () => {
            try{
                // calling to the protected view
                const response = await axiosInstance.get('protected-view/');

            }catch (error){
                alert(error.response.status+': '+error.response.statusText+' / '+error.response.data.detail);
            }
        }
        fetch_protected_data();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{

            const response = await axiosInstance.post('predict/', {
                ticker: ticker
            });

            console.log(response) // response.data

            if (response.data.error){
                setShowModal({
                    'modal': true,
                    'title': 'An error ocurred',
                    'message': response.data.error
                });
            }

            const backend_root = import.meta.env.VITE_BACKEND_ROOT
            const plot_url = backend_root+response.data.plot_img;
            const ma100_url = backend_root+response.data.plot_100_dma;
            const prediction_url = backend_root+response.data.plot_prediction;
            setPlot(plot_url);
            setMA100(ma100_url);
            setPrediction(prediction_url);
            setMSE(response.data.mse);
            setRMSE(response.data.rmse);
            setR2(response.data.r2);

        } catch(error){

            setShowModal({
                'modal': true,
                'title': 'An error ocurred',
                'message': error.message
            });
        } finally {
            setLoading(false);
        }
    }

    const handleCloseModal = () => {
        setShowModal({
        'modal': false,
        'title': '',
        'message': ''
        });
    }

  return (
    
    <>
        <Container className="container-custom d-flex align-items-center justify-content-center">
            <Row>
                <Col className="mx-auto">
                    <Form className="text-center" onSubmit={handleSubmit}>
                        <Form.Control type="text" placeholder="Enter Stock Ticker" onChange={(e) => setTicker(e.target.value)} required />
                        
                        {
                            loading ? (
                                <Button type="submit" className="btn btn-info d-block mx-auto" disabled>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span >Loading...</span>
                                </Button>
                            ) : (
                                <Button type="submit" className="btn btn-info mt-3">See Prediction</Button>
                            )
                        }
                    </Form>
                </Col>
            </Row>

        </Container>

        {/* Print Predictions plots */}
        { // si no hay petición, no muestra los plots
            plot && (
                <>
                    <Container className="prediction mt-5">
                        <Container className="p-5">
                            {
                                plot && (
                                    <img src={plot} style={{maxWidth: '100%'}}></img>
                                )
                            }
                        </Container>
            
                    </Container>

                    <Container className="prediction mt-5">
                        <Container className="p-5">
                            {
                                ma100 && (
                                    <img src={ma100} style={{maxWidth: '100%'}}></img>
                                )
                            }
                        </Container>
                        
                    </Container>

                    <Container className="prediction mt-5">
                        <Container className="p-5">
                            {
                                prediction && (
                                    <img src={prediction} style={{maxWidth: '100%'}}></img>
                                )
                            }
                        </Container>
                        
                    </Container>

                    <Container className="text-light p-3">
                        <h4>Model Evaluation</h4>
                        <p>Mean Squared Error: {mse}</p>
                        <p>Root Mean Squared Error: {rmse}</p>
                        <p>R-square: {r2}</p>
                    </Container>
                </>
            )
        }
        

        {
            show_modal.modal && (
                <ModalMessage title={show_modal.title} message={show_modal.message} modal={show_modal.modal} onClose={handleCloseModal} />
            )
        }
    </>
  )
}

export default Dashboard
