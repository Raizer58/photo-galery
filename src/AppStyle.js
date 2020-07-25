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

  .modal-window{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.75);

    .button-close-modal-window{
      position: absolute;
      top: 25px;
      right: 50px;
      width: 90px;
      height: 30px;
    }

    .modal-window__container{
      width: max-content;
      height: max-content;
      position: relative;

      .left-slid,
      .right-slid{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: calc(50% - 37.5px);
        border: solid 2px black;
        border-radius: 200px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        transition: transform .3s easy-in-out;

        &:hover{
          transform: scale(1.25);
          transition: transform .3s easy-in-out;
        }
      }

      .left-slid{
        left: 25px;
      }

      .right-slid{
        right: 25px;
      }
    }

  }
`;

export default style;
