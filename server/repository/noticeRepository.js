import {promises as fsPromises} from 'fs';



export const getNotices = () => {
	const path = 'data/notice.json';
	const notices = fsPromises.readFile(path, 'utf-8')
		.then((data)=>{
			const jsonData = JSON.parse(data)
			return jsonData;
		})
		.catch(error =>console.log(error))
		return notices
}

export const getNotice = (id) => {
	const path = 'data/notice.json';
	const notice = fsPromises.readFile(path, 'utf-8')
		.then((data)=>{
			const jsonData = JSON.parse(data)
			const noticeData = jsonData.filter(item => item.id === id)
			return noticeData[0];
		})
		.catch(error => console.log(error))

		return notice;
}