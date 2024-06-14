import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//paging navigation
import Pagination from "rc-pagination";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";
// import Search from './Search';

export default function Table({
  name,
  currentPage,
  pageSize,
  handleChange,
  listPage,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [searchCompleted, setSearchCompleted] = useState(false);

  const [totalCount, setTotalCount] = useState(posts.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.50.76:3000/data/${name}.json`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const search = () => {
      if (searchTerm.trim() !== "") {
        const filtered = posts.filter(
          (post) =>
            (post.title &&
              post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.body &&
              post.body.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(posts);
      }
    };

    search();
  }, [searchTerm, posts]);

  useEffect(() => {
    if (query.has("q")) {
      setSearchTerm(query.get("q"));
      setSearchCompleted(true); // 검색 완료 상태로 설정
      setTotalCount(filteredPosts.length); // 검색 결과에 따라 totalCount 값을 설정
    } else {
      setSearchCompleted(false);
      setTotalCount(posts.length); // 검색이 완료되지 않은 경우 기존의 totalCount 값을 사용
    }
  }, [query, filteredPosts, posts.length]);

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setQuery({ q: searchTerm });
      setSearchCompleted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Backspace") {
      setSearchTerm("");
      setQuery("");
    }
  };

  const tableWidth = {
    width10: { width: "10%" },
    width20: { width: "20%" },
    width60: { width: "60%" },
  };

  return (
    <>
      <div className="count">
        <span className="count-no">
          <span className="count-no-icon">
            <FontAwesomeIcon icon={faList} />
          </span>
          <span className="count-no-text">
            <span className="count-no-red">{totalCount}</span> 개의 게시물
          </span>
        </span>
      </div>
      <div className="Board">
        <table className="Board-table">
          <colgroup>
            <col style={tableWidth.width10} />
            <col style={tableWidth.width60} />
            <col style={tableWidth.width10} />
            <col style={tableWidth.width20} />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {searchCompleted
              ? filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="Board-list-no">{post.no}</td>
                    <td className="Board-list-subject">
                      <Link to={`/${name}/${post.id}`}>
                        <span>{post.title}</span>
                      </Link>
                    </td>
                    <td className="Board-list-name">{post.author}</td>
                    <td className="Board-list-date">{post.date}</td>
                  </tr>
                ))
              : listPage.map((item, index) => (
                  <tr key={index}>
                    <td className="Board-list-no">{item.no}</td>
                    <td className="Board-list-subject">
                      <Link to={`/${name}/${item.id}`}>
                        <span>{item.title}</span>
                        <img src={item.srcImg} alt={item.altImg} />
                        <img src={item.srcNew} alt={item.altNew} />
                      </Link>
                    </td>
                    <td className="Board-list-name">{item.author}</td>
                    <td className="Board-list-date">{item.date}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        <Pagination
          className="d-flex justify-content-center"
          current={currentPage}
          total={totalCount}
          pageSize={pageSize}
          onChange={handleChange}
          prevPageText={"<"}
          nextPageText={">"}
        />
        <div className="search">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="search-btn" onClick={handleSearch}>
            검색
          </button>

          {/* <Search /> */}
        </div>
      </div>
    </>
  );
}
