import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import ProductService from '../service/ProductService';

const PuntoEmision = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [editProductDialog, setEditProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [selectedEstado, setSelectedEstado] = useState(null);
    const [selectedTipoIdentificacionCompania, setSelectedTipoIdentificacionCompania] = useState(null);
    const [checkedContribuyenteEspecial, setCheckedContribuyenteEspecial] = useState(false);
    const [checkedObligadoLlevarContabilidad, setCheckedObligadoLlevarContabilidad] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const toolbarItems = [
        {
            label: 'Crear compañia',
            icon: 'pi pi-plus-circle',
            command: openNew
        },
        {
            label: 'Limpiar',
            icon: 'pi pi-sync'
        }
    ];

    const countries = [
        { name: 'Activo', code: 'AU' },
        { name: 'Eliminado', code: 'BR' }
    ];
    const tipoIdent = [{ name: 'Ruc' }, { name: 'Cedula' }];

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideEditarProductDialog = () => {
        setSubmitted(false);
        setEditProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setEditProductDialog(true);
    };

    const accionesCompanias = [
        {
            label: 'Editar compañia',
            icon: 'pi pi-pencil',
            command: editProduct
        },
        {
            label: 'Firma Electronica',
            icon: 'pi pi-bookmark-fill'
        },
        {
            label: 'Logo Compañia',
            icon: 'pi pi-bookmark-fill'
        }
    ];
    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const selectedEstadoTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const estadoOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const selectedTipoIdentificacionCompaniaTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const TipoIdentificacionCompaniaOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="grid">
                    <div className="col-3">
                        <span className="p-float-label">
                            <InputText id="ruc" keyfilter="text" className="w-full" />
                            <label htmlFor="ruc" className="font-bold block mb-2">
                                Estableciomiento
                            </label>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="p-float-label">
                            <InputText id="email" keyfilter="num" className="w-full" />
                            <label htmlFor="email" className="font-bold block mb-2">
                                Punto Emision
                            </label>
                        </span>
                    </div>
                    <div className="col-3">
                        <Dropdown
                            value={selectedEstado}
                            onChange={(e) => setSelectedEstado(e.value)}
                            options={countries}
                            optionLabel="name"
                            placeholder="Estado..."
                            filter
                            valueTemplate={selectedEstadoTemplate}
                            itemTemplate={estadoOptionTemplate}
                            className="w-full md:w-14rem"
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="col-3">
                    <SplitButton label="Opciones" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;
                </div>
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <SplitButton icon="pi pi-cog" model={accionesCompanias} menuStyle={{ width: '12rem' }}></SplitButton>;
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-warning" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-warning" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Panel className="panel-filtro-compania" header="FILTROS DE BUSQUEDA" toggleable>
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    </Panel>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorPosition="top,bottom"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="{first} al {last} de {totalRecords} Registros"
                        globalFilter={globalFilter}
                        emptyMessage="Informacion no encontrada"
                        responsiveLayout="scroll"
                    >
                        <Column field="name" header="Tipo Ident." sortable body={nameBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                        <Column field="price" header="Ruc" body={priceBodyTemplate} sortable headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>
                        <Column field="category" header="Razon Social" sortable body={categoryBodyTemplate} headerStyle={{ width: '35%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ maxWidth: '770px' }} header="Crear Datos Compañia" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="grid">
                            <div className="field col-12 md:col-3">
                                <br />
                                <span className="p-float-label">
                                    <InputNumber id="ruc" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} required useGrouping={false} maxLength={13} />
                                    <label htmlFor="ruc" className="font-bold block mb-2">
                                        RUC
                                    </label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <br />
                                <span className="p-float-label">
                                    <InputText id="razon-social" value={product.description} onChange={(e) => onInputChange(e, 'description')} required />
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
                                        valueTemplate={selectedTipoIdentificacionCompaniaTemplate}
                                        itemTemplate={TipoIdentificacionCompaniaOptionTemplate}
                                        className="w-full md:w-12rem"
                                    />
                                    <label htmlFor="tipo-identificacion">Tipo Ident.</label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span className="p-float-label">
                                    <InputText id="nombre-comercial" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                    <label htmlFor="nombre-comercial" className="font-bold block mb-2">
                                        Nombre Comercial
                                    </label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span className="p-float-label">
                                    <InputText id="direccion-matriz" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                    <label htmlFor="direccion-matriz" className="font-bold block mb-2">
                                        Dirección Matriz
                                    </label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <InputText id="mail" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                    <label htmlFor="mail" className="font-bold block mb-2">
                                        Mail
                                    </label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <InputText id="mail-notificacion" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                    <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                        Mail Notificación
                                    </label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-3">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-6 col-sm-6">
                                            <Checkbox onChange={(e) => setCheckedContribuyenteEspecial(e.checked)} checked={checkedContribuyenteEspecial}></Checkbox>
                                        </div>
                                        <div className="col-6 col-sm-6">Es Contribuyente Especial</div>
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-3">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-6 col-sm-6">
                                            <Checkbox onChange={(e) => setCheckedObligadoLlevarContabilidad(e.checked)} checked={checkedObligadoLlevarContabilidad}></Checkbox>
                                        </div>
                                        <div className="col-6 col-sm-6">Obligado LLevar Contabilidad</div>
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <InputText id="mail-notificacion" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                    <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                        Cod. Contribuyente Especial
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={editProductDialog} style={{ maxWidth: '770px' }} header="Crear Datos Compañia" modal className="p-fluid" footer={productDialogFooter} onHide={hideEditarProductDialog}>
                        <TabView className="container-editar-compania">
                            <TabPanel header="Configuracion General">
                                <div className="grid">
                                    <div className="field col-12 md:col-3">
                                        <br />
                                        <span className="p-float-label">
                                            <InputNumber id="ruc" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} required useGrouping={false} maxLength={13} />
                                            <label htmlFor="ruc" className="font-bold block mb-2">
                                                RUC
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <br />
                                        <span className="p-float-label">
                                            <InputText id="razon-social" value={product.description} onChange={(e) => onInputChange(e, 'description')} required />
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
                                                valueTemplate={selectedTipoIdentificacionCompaniaTemplate}
                                                itemTemplate={TipoIdentificacionCompaniaOptionTemplate}
                                                className="w-full md:w-12rem"
                                            />
                                            <label htmlFor="tipo-identificacion">Tipo Ident.</label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-12">
                                        <span className="p-float-label">
                                            <InputText id="nombre-comercial" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                            <label htmlFor="nombre-comercial" className="font-bold block mb-2">
                                                Nombre Comercial
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-12">
                                        <span className="p-float-label">
                                            <InputText id="direccion-matriz" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                            <label htmlFor="direccion-matriz" className="font-bold block mb-2">
                                                Dirección Matriz
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span className="p-float-label">
                                            <InputText id="mail" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                            <label htmlFor="mail" className="font-bold block mb-2">
                                                Mail
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span className="p-float-label">
                                            <InputText id="mail-notificacion" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                            <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                                Mail Notificación
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-6 col-sm-6">
                                                    <Checkbox onChange={(e) => setCheckedContribuyenteEspecial(e.checked)} checked={checkedContribuyenteEspecial}></Checkbox>
                                                </div>
                                                <div className="col-6 col-sm-6">Es Contribuyente Especial</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-6 col-sm-6">
                                                    <Checkbox onChange={(e) => setCheckedObligadoLlevarContabilidad(e.checked)} checked={checkedObligadoLlevarContabilidad}></Checkbox>
                                                </div>
                                                <div className="col-6 col-sm-6">Obligado LLevar Contabilidad</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span className="p-float-label">
                                            <InputText id="mail-notificacion" value={product.name} onChange={(e) => onInputChange(e, 'name')} required />
                                            <label htmlFor="mail-notificacion" className="font-bold block mb-2">
                                                Cod. Contribuyente Especial
                                            </label>
                                        </span>
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
                                    <div className='col-12 configuracion-reportes-label'>
                                        <span className='col-2'>
                                            <Checkbox onChange={(e) => setCheckedContribuyenteEspecial(e.checked)} checked={checkedContribuyenteEspecial}></Checkbox>
                                        </span>
                                        <span className='col-2'>{'00'}</span>
                                        <span className='col-7'>NO VISUALIZAR DOCUMENTOS DE PRUEBA</span>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Configuraciones Varias">
                                <p>
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                                    sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                    impedit quo minus.
                                </p>
                            </TabPanel>
                        </TabView>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PuntoEmision;
