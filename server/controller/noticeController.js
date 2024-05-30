import * as repository from '../repository/noticeRepository.js';

export const getNotices = async (req, res) => {
	const notices = await repository.getNotices();
	res.json(notices)
}


export const getNotice = async (req, res) => {
	const notice = await repository.getNotice(req.params.id);
	res.json(notice)
}