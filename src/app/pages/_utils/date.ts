import dayjs from 'dayjs'

export const formatDateTime = (d: string | number | Date | null) => {
    if (d === null) {
        return null;
    }

    const date = d instanceof Date ? d : new Date(d);
    return dayjs(d).format('DD/MM/YYYY hh:mm:ss')
}

export const formattedCurrendDateTime = () => {
    return dayjs().format('DD/MM/YYYY hh:mm:ss')
}