import Style from "styled-components";

const style = Style.div`
  font-size: 15px;  
  color: white;
  text-align: center;
  padding-bottom: 50px;

  h2{
    font-size: 36px;
    color: black;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0px 30px;

    li {
      width: calc((100% / 4 ) - 40px);
      text-align: center;
      margin: 10px;
      padding: 10px;
      background: cadetblue;
      cursor: pointer;

      h3{
        span{
          font-size: 28px;
          font-weight: 900;
        }
      }

      p{
        span{
          font-size: 18px;
          font-weight: 900;
        }
      }

      img{
        width: 100%;
      }
    }
  }

  button{
    width: 150px;
    height: 30px;
    cursor: pointer;
    transition: transform .2s ease-in-out;

    &:hover{
      transform: scale(1.1) translateY(-5px);
      transition: transform .2s ease-in-out;
      box-shadow: 0px 5px 10px 0px grey;
    }
  }
`;

export default style;
