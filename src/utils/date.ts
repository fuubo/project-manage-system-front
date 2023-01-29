import type { TableColumnCtx } from "element-plus";

export const tableDateFormatter = (row: any, column: TableColumnCtx<any>) => {
    const date = new Date(row[column.property]);
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export const dateFormatter = (dateStr: string) => {
    const date = new Date(dateStr);
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}