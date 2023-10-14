import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import PropTypes from 'prop-types';

const EditarCompania = ({ detalleCompanias, detCompania, onInputChange, selectedTipoIdentificacionCompaniaTemplate, TipoIdentificacionCompaniaOptionTemplate, parametrosCompaniaTemplate, panelFooterParametrosCompaniaTemplate }) => {

    const [selectedTipoIdentificacionCompania, setSelectedTipoIdentificacionCompania] = useState(null);
    const [checkedContribuyenteEspecial, setCheckedContribuyenteEspecial] = useState(false);

    const [selectedParametrosCompania, setSelectedParametrosCompania] = useState(null);
    const tipoIdent = [{ name: 'Ruc' }, { name: 'Cedula' }];
    const [compania, setCompania] = useState(detCompania);


    useEffect(() => {
        setCompania(detalleCompanias?.detCompanias?.configuracionGeneral);
        console.log("compania",compania);
    },[compania]);

    return (
        <TabView className="container-editar-compania">
            <TabPanel header="Configuracion General">
                <div className="grid">
                    <div className="field col-12 md:col-3">
                        <br />
                        <span className="p-float-label">
                            <InputText id="ruc" defaultValue={detalleCompanias?.detCompanias?.configuracionGeneral?.ruc} disabled />
                            <label htmlFor="ruc" className="font-bold block mb-2">
                                RUC
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText id="ruc" value={detalleCompanias?.detCompanias?.configuracionGeneral?.razonSocial} disabled />
                            <label htmlFor="razon-social" className="font-bold block mb-2">
                                Razon Social
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-3">
                        <br />
                        <span className="p-float-label">
                            <Dropdown
                                id="tipo-identificacion"
                                value={selectedTipoIdentificacionCompania}
                                onChange={(e) => setSelectedTipoIdentificacionCompania(e.value)}
                                options={tipoIdent}
                                optionLabel="name"
                                placeholder="Tipo Ident..."
                                defaultValue={detalleCompanias?.detCompanias?.configuracionGeneral?.estado}
                                valueTemplate={selectedTipoIdentificacionCompaniaTemplate}
                                itemTemplate={TipoIdentificacionCompaniaOptionTemplate}
                                className="w-full md:w-12rem"
                            />
                            <label htmlFor="tipo-identificacion">Tipo Ident.</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                            <InputText id="nombre-comercial" value={detalleCompanias?.detCompanias?.configuracionGeneral?.nombreComercial} />
                            <label htmlFor="nombre-comercial" className="font-bold block mb-2">
                                Nombre Comercial
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                        <InputText id="direccion" value={detalleCompanias?.detCompanias?.configuracionGeneral?.direccion} onChange={(e) => onInputChange(e, 'direccion')}/>
                            <label htmlFor="direccion" className="font-bold block mb-2">
                                Dirección Matriz
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                        <InputText id="mail" value={detalleCompanias?.detCompanias?.configuracionGeneral?.mail} />
                            <label htmlFor="mail" className="font-bold block mb-2">
                                Mail
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                        <InputText id="mail-notificacion" value={detalleCompanias?.detCompanias?.configuracionGeneral?.mailNotificacion} onChange={(e) => onInputChange(e, 'mailNotificacion')} />
                            <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                Mail Notificación
                            </label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <MultiSelect
                            filter
                            value={selectedParametrosCompania}
                            options={detalleCompanias?.detCompanias?.configuracionGeneral?.parametrosCompania}
                            onChange={(e) => setSelectedParametrosCompania(e.value)}
                            optionLabel="nombre"
                            placeholder="Parametros Compañia"
                            itemTemplate={parametrosCompaniaTemplate}
                            panelFooterTemplate={panelFooterParametrosCompaniaTemplate}
                            className="w-full md:w-20rem"
                            display="chip"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="mail-notificacion" value={detalleCompanias?.detCompanias?.configuracionGeneral?.codContribuyenteEspecial} onChange={(e) => onInputChange(e, 'codContribuyenteEspecial')} disabled />
                            <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                Cod. Contribuyente Especial
                            </label>
                        </span>
                        <br />
                        <div className="field col-12">
                            <Button label="Modificar" icon="pi pi-save" className="p-button-warning mr-6" />
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Recepción Documentos">
                <div className="grid">
                    <div className="col-6">
                        <span className="p-float-label">
                            <InputText id="ruc" className="w-full" />
                            <label htmlFor="ruc" className="font-bold block mb-2">
                                Usuario SRI ONLINE
                            </label>
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="p-float-label">
                            <InputText id="ruc" className="w-full" />
                            <label htmlFor="ruc" className="font-bold block mb-2">
                                Contraseña SRI ONLINE
                            </label>
                        </span>
                    </div>
                    {/*
                <div className="col-4">
                    <Button label="Guardar" icon="pi pi-save" className="p-button-warning mr-6" />
                </div>*/}
                </div>
            </TabPanel>
            <TabPanel header="Configuracion Reportes">
                <div className="col-4">
                    <Button label="Modificar" icon="pi pi-save" className="p-button-warning mr-6" />
                </div>
                <div className="card flex flex-wrap">
                    <span className="p-input-icon-right">
                        <i className="pi pi-search" />
                        <InputText placeholder="" />
                    </span>
                    <div className="col-12 configuracion-reportes-label">
                        <span className="col-2">
                            <Checkbox onChange={(e) => setCheckedContribuyenteEspecial(e.checked)} checked={checkedContribuyenteEspecial}></Checkbox>
                        </span>
                        <span className="col-2">{'00'}</span>
                        <span className="col-7">NO VISUALIZAR DOCUMENTOS DE PRUEBA</span>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Configuraciones Varias">
                <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
            </TabPanel>
        </TabView>
    );
};

EditarCompania.propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EditarCompania;
