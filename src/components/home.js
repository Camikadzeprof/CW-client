import React from 'react'

class Main extends React.Component {
    render() {
        return (
            <div className="main_content">
                <div className="info">
                    <section className="py-5">
                        <div className="container px-3 px-lg-5 my-15">
                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <h1 className="display-5 fw-bolder">Курсовой проект "Доставка еды"</h1>
                                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
                                                               src="https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg" width="900" height="600"
                                                               alt="..."/> </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Main