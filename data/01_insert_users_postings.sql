INSERT INTO users (id, name, email, password) VALUES
(1, 'Melony', 'melony10@wecode.com', 'password111'),
(2, 'Samon', 'samon11@starbuck.com', 'password123');

INSERT INTO posts (id, title, content, user_id) VALUES
(1, '오늘의 일기', '갑작스럽게 가을 날씨가 되었다...!', 1),
(2, '위워크와 에어컨', '여기는 왜 이 추운 날씨에도 에어컨을 이렇게 미친듯이 켜는걸까... 패딩이 입고 싶을 정도다ㅠㅠ', 1),
(3, '자주 만나고 싶다', '현진이가 빨리 취업하면 좋겠다', 2);

-- mysql 시작할 때 뒤에 "DB명 < 01_insert_users_postings.sql" 를 추가해준다!!
-- sql문 뒤에 세미콜론(;) 잊지 말자!!!!!!