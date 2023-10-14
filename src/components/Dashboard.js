import React, { useState, useEffect, useRef } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import API from '../data';
import { useComboCompanias } from '../data/useComboCompanias';
import { useDashboard } from '../data/useDashboard';
import Skeleton from 'react-loading-skeleton';

const Dashboard = (props) => {
    const [uuid, setUuid] = useState(null);
    const { companias, isLoading, isError } = useComboCompanias();
    const dashboardCompania = useDashboard(uuid);

    const [products, setProducts] = useState([]);
    const [events, setEvents] = useState([]);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [selectedCity1, setSelectedCity1] = useState(null);

    const items = [
        { label: 'Save', icon: 'pi pi-fw pi-check' },
        { label: 'Update', icon: 'pi pi-fw pi-refresh' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ];

    const menuRef = useRef(null);

    useEffect(() => {
        console.log('uuid', uuid);
        console.log('companiesDahas', dashboardCompania);
    });

    const menuToggle = (event) => {
        menuRef.current.toggle(event);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const priceBodyTemplate = (data) => {
        return formatCurrency(data.price);
    };

    const bodyTemplate = (data, props) => {
        return data[props.field];
    };

    const statusBodyTemplate = (data) => {
        return <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>;
    };

    const onCityChange = (e) => {
        console.log('valores', e.value.uuid);
        setUuid(e.value.uuid);
        setSelectedCity1(e.value);
    };

    const tabHeaderIIITemplate = () => {
        return (
            <div>
                <Dropdown value={selectedCity1} options={companias?.combo} onChange={onCityChange} optionLabel="descripcion" placeholder="Escoja compania..." />
            </div>
        );
    };

    return (
        <div className="layout-dashboard">
            <TabView>
                {dashboardCompania.isLoading ? (
                    <TabPanel header="Administracion General">
                        <Skeleton />
                    </TabPanel>
                ) : dashboardCompania.isError ? (
                    console.log(dashboardCompania.isError)
                ) : (
                    <TabPanel header="Administracion General">
                        <>
                            <div className="grid grid-adminitracion-general-card-box">
                                <div className="col-12 lg:col-6">
                                    <div className="overview-box sales ventas-brutas">
                                        <i className="overview-icon pi pi-dollar"></i>
                                        <div className="overview-numbers">${dashboardCompania.dashboardCompania.ventaMes}</div>
                                        <span className="overview-title">Ventas Brutas</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6">
                                    <div className="overview-box views">
                                        <i className="overview-icon pi pi-search"></i>
                                        <div className="overview-numbers">${dashboardCompania.dashboardCompania.impMes}</div>
                                        <span className="overview-title">Impuesto Ventas</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6 xl:col-3">
                                    <div className="overview-box users">
                                        <i className="overview-icon pi pi-users"></i>
                                        <div className="overview-numbers">9522</div>
                                        <span className="overview-title">Facturas</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6 xl:col-3">
                                    <div className="overview-box users">
                                        <i className="overview-icon pi pi-map-marker"></i>
                                        <div className="overview-numbers">4211</div>
                                        <span className="overview-title">Notas de Credito</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6 xl:col-3">
                                    <div className="overview-box checkin">
                                        <i className="overview-icon pi pi-users"></i>
                                        <div className="overview-numbers">9522</div>
                                        <span className="overview-title">Retenciones</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6 xl:col-3">
                                    <div className="overview-box checkin">
                                        <i className="overview-icon pi pi-map-marker"></i>
                                        <div className="overview-numbers">4211</div>
                                        <span className="overview-title">Guias Remision</span>
                                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                        <div className="overview-subinfo">Mes Actual</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-12 md:col-12 lg:col-4">
                                    <div className="card card-w-title team">
                                        <h6>Top 5 clientes Recurrentes - Ultimos 30 dias</h6>
                                        <ul>
                                            {dashboardCompania.dashboardCompania.lista1.map((item) => (
                                                <li key={item.ruc}>
                                                    <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                                    <div className="team-box">
                                                        <span className="team-member">{item.resume1}</span>
                                                        <span className="team-member-role">{item.resume2}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 md:col-12 lg:col-4">
                                    <div className="card card-w-title team">
                                        <h6>Top 5 clientes Ventas - Ultimos 30 dias</h6>
                                        <ul>
                                            {dashboardCompania.dashboardCompania.lista2.map((item) => (
                                                <li key={item.ruc}>
                                                    <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                                    <div className="team-box">
                                                        <span className="team-member">{item.resume1}</span>
                                                        <span className="team-member-role">{item.resume2}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 md:col-12 lg:col-4">
                                    <div className="card card-w-title team">
                                        <h6>Top 5 clientes Ventas - Año actual</h6>
                                        <ul>
                                            {dashboardCompania.dashboardCompania.lista3.map((item) => (
                                                <li key={item.ruc}>
                                                    <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                                    <div className="team-box">
                                                        <span className="team-member">{item.resume1}</span>
                                                        <span className="team-member-role">{item.resume2}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    </TabPanel>
                )}
                <TabPanel header="Facturas">
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel header="Notas de Credito">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
                <TabPanel header="Retenciones">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
                <TabPanel className="combo-empresas" headerTemplate={tabHeaderIIITemplate}></TabPanel>
            </TabView>
        </div>
    );
};

export default Dashboard;
