import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import DataTable, { type TableProps, type TableColumn } from 'react-data-table-component'
import { DynamicIcon } from './DynamicIcon';
import { IResponseApi, IMetaResponse } from '@/models/IResponseApi.model';


export interface CustomTableProps {
    data: IResponseApi<any>;
    columns: TableColumn<any>[];
    customStyles?: any;
    onChange: (meta: IMetaResponse) => void;
    [key: string]: any;
}

export default function Table({ data, columns, customStyles, onChange, ...propsDataTable }: CustomTableProps) {


    const [paginationOptions, setPaginationOptions] = useState<IMetaResponse>({
        page: data.meta.page,
        take: data.meta.take,
        itemCount: data.meta.itemCount,
        pageCount: data.meta.pageCount,
        hasPreviousPage: data.meta.hasPreviousPage,
        hasNextPage: data.meta.hasNextPage
    });

    const styles: any = {
        header: {
            style: {
                minHeight: '56px',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        headRow: {
            style: {

            },
        },
        headCells: {
            style: {
                fontWeight: 'semi-bold',
                fontSize: '20px',
                minHeight: '56px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                borderRightStyle: 'solid',

            },
        },
        cells: {
            style: {
                borderRightStyle: 'solid',
                minHeight: '70px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
            },
        },
    };

    const propsTable: TableProps<any> = {
        columns: [],
        data: [],
        pagination: false,
        customStyles: customStyles ? customStyles : styles,
        dense: true,
        ...propsDataTable
    }

    const onChangePage = (page: number) => {
        setPaginationOptions({
            ...paginationOptions,
            page
        });
    }

    const onChangePerPage = (newPerPage: number, page: number) => {
        setPaginationOptions({
            ...paginationOptions,
            take: newPerPage
        });
        if (newPerPage === -1) {
            setPaginationOptions({
                ...paginationOptions,
                take: paginationOptions.itemCount
            });
        } else {
            if (newPerPage > paginationOptions.take) {
                setPaginationOptions({
                    ...paginationOptions,
                    take: newPerPage
                });
            } else {
                setPaginationOptions({
                    ...paginationOptions,
                    take: newPerPage,
                    page: 1
                });
            }
        }

    }

    useEffect(() => {
        onChange(paginationOptions);
    }, [paginationOptions]);

    const startRecord = (data.meta.page - 1) * data.meta.take + 1;
    const endRecord = Math.min(data.meta.page * data.meta.take, data.meta.itemCount);

    return (
        <>
            <DataTable
                {...propsTable}
                columns={columns}
                data={data.data}
                noDataComponent={<div className='flex flex-col justify-center my-8'>
                    <Empty description="No hay datos" />
                </div>}
                progressComponent={
                    <div className="flex flex-col justify-center gap-5 items-center">
                        <span className="loading loading-spinner loading-lg" />
                        Cargando datos...
                    </div>
                }
                fixedHeader={true}
            />
            <div className='w-full flex flex-col md:flex-row justify-end items-center gap-5 mt-1' >
                <label className="form-control w-full max-w-xs">
                    <select className="select" onChange={(e) => onChangePerPage(Number(e.target.value), paginationOptions.page)} value={data.meta.take}>
                        <option value={5}>Items por página: 5</option>
                        <option value={10} >Items por página: 10</option>
                        <option value={15} >Items por página: 15</option>
                        <option value={20} >Items por página: 20</option>
                    </select>
                </label>
                <p>
                    Página {data.meta.page} de {data.meta.pageCount} | Registros {startRecord}-{endRecord} de {data.meta.itemCount}
                </p>
                <div className='flex gap-5' >
                    <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(1)} disabled={!data.meta.hasPreviousPage}>
                        <DynamicIcon icon='mdi:chevron-double-left' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(data.meta.page - 1)} disabled={!data.meta.hasPreviousPage}>
                        <DynamicIcon icon='ci:chevron-left-md' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(data.meta.page + 1)} disabled={!data.meta.hasNextPage}>
                        <DynamicIcon icon='ci:chevron-right-md' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(data.meta.pageCount)} disabled={!data.meta.hasNextPage}>
                        <DynamicIcon icon='mdi:chevron-double-right' className='text-3xl' />
                    </button>
                </div>
            </div>
        </>

    );

}
