import * as repository from '../repository/inquiryRepository.js'


//게시글 수정완료
export const update = async(req, res) => {
	const boardFormData =req.body;
	console.log('컨트롤러-boardFormData->', boardFormData);

	const result = await repository.update(boardFormData);
	res.json(result);

}

// 게시글 상세페이지 
export const detail = async (req, res) => { //req : get=>req.params, post=>req.body
	const bid =req.params.bid; 
	const result = await repository.detail(bid);
	res.json(result);
}

//게시판 등록 
export const insert = async(req, res) => {
	const boardFormData = req.body;
	const result = await repository.insert(boardFormData);	
	res.json(result);
	console.log('boardFormData', boardFormData);
}

//게시판 리스트
export const list = async(req, res) => {
	const result = await repository.list();
	res.json(result);
}