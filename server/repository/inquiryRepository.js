import {db} from '../db/database_mysql.js';

// 조회수 업데이트
export const updateHits = async(bid) => {
	let result_rows = 0;
	const sql = `
		update ever_board
			set bhits = bhits + 1
			where bid = ?
	`;
	try {
		const [result] = await db.execute(sql, [bid]);
		result_rows = result.affectedRows;
	} catch (error) {
		console.log(error);
	}
	return {cnt: result_rows};
}

//게시글 삭제하기
export const bidDelete = async(bid) => {
	let result_rows = 0;
	const sql = `
		delete from ever_board where bid = ?
	`;
	try {
		const [result] = await db.execute(sql, [bid])
		result_rows = result.affectedRows;
	} catch (error) {
		console.log(error);
	}
	return{cnt: result_rows};

}

//게시글 수정완료
export const update = async(boardFormData) => {
		let result_rows = 0;
		const params = [
			boardFormData.btitle,
			boardFormData.bcontent,
			boardFormData.bid
		];

		const sql = `
		update ever_board
			set btitle = ? , bcontent = ? 
			where bid = ?
		`;
		
		try {
				const [result] = await db.execute(sql, params)
				result_rows = result.affectedRows;
		} catch (error) {
			console.log(error);
		}
		return {cnt : result_rows};
}


//게시글 상세페이지
export const detail = async(bid) => {
	const sql = `
		select bid, btitle, bcontent, bhits, cast(bdate as char) bdate
			from ever_board
			where bid = ?
	`;
	return db	
				.execute(sql, [bid])
				.then(result => result[0][0]);
}

//게시판 등록
export const insert = async(boardFormData) => {
	let result_rows = 0;
	const sql = `
		insert into ever_board(btitle, bcontent, bhits, bdate)
			values(?,?,0, now())
	`;

	try {
		const [result] = await db.execute(sql, [boardFormData.btitle, boardFormData.bcontent])
		result_rows = result.affectedRows;
	} catch (error) {
		console.log(error);
	}
	return {cnt : result_rows};
}

//게시판 리스트
export const list = async(params) => {
	const sql = `
		select rno, bid, btitle, bhits, bdate, total from
			(select row_number() over (order by bdate desc) as rno,
			bid, btitle, bcontent, bhits, left(bdate, 10) as bdate,
				(select count(*) from ever_board) total
			from ever_board) eb1
		where rno between ? and ?
	`;

	return db
			.execute(sql, [params.startIndex, params.endIndex])
			.then(result => result[0]);

}

