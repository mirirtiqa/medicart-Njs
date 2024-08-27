"use client";
import styled from 'styled-components';

const Container = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%; 
  height: 30vh;
  background-color:#033B4A;
;
  justify-content: space-evenly;
  @media (max-width: 900px) {
    height:auto;
    flex-direction: column;
  }
`;

const FooterP = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 22.63px;
  color: white;
  display:flex;
  flex-direction: row;
  gap:5px;
  margin: 15px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
`;
const Footerdiv = styled.div`
display:flex;
flex-direction:column;
`;
export default function Footer(){
    

    return (
      <>
    <Container>
    <div>
        <FooterP>123 MEDICAL AVENUE, NEW YORK USA</FooterP>
        <FooterP>
        INFO@MEDICAREHUB.COM</FooterP>
    </div>
    <Footerdiv >
        <FooterP>OPERATING HOURS:</FooterP>
        <FooterP style={{ fontWeight: 400 }}>MONDAY - FRIDAY 9:00 - 6:00<br/>
        SATURDAY - SUNDAY 9:00 - 5:00
        </FooterP>
    </Footerdiv>
    <div>
      <FooterP>CONNECT WITH US</FooterP>
      <FooterP>
      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0061 7.81251C10.0311 7.81251 6.8248 11.0188 6.8248 14.9938C6.8248 18.9688 10.0311 22.175 14.0061 22.175C17.9811 22.175 21.1873 18.9688 21.1873 14.9938C21.1873 11.0188 17.9811 7.81251 14.0061 7.81251ZM14.0061 19.6625C11.4373 19.6625 9.3373 17.5688 9.3373 14.9938C9.3373 12.4188 11.4311 10.325 14.0061 10.325C16.5811 10.325 18.6748 12.4188 18.6748 14.9938C18.6748 17.5688 16.5748 19.6625 14.0061 19.6625ZM23.1561 7.51876C23.1561 8.45001 22.4061 9.19376 21.4811 9.19376C20.5498 9.19376 19.8061 8.44376 19.8061 7.51876C19.8061 6.59376 20.5561 5.84376 21.4811 5.84376C22.4061 5.84376 23.1561 6.59376 23.1561 7.51876ZM27.9123 9.21876C27.8061 6.97501 27.2936 4.98751 25.6498 3.35001C24.0123 1.71251 22.0248 1.20001 19.7811 1.08751C17.4686 0.956262 10.5373 0.956262 8.2248 1.08751C5.9873 1.19376 3.9998 1.70626 2.35605 3.34376C0.712305 4.98126 0.206055 6.96876 0.0935547 9.21251C-0.0376953 11.525 -0.0376953 18.4563 0.0935547 20.7688C0.199805 23.0125 0.712305 25 2.35605 26.6375C3.9998 28.275 5.98105 28.7875 8.2248 28.9C10.5373 29.0313 17.4686 29.0313 19.7811 28.9C22.0248 28.7938 24.0123 28.2813 25.6498 26.6375C27.2873 25 27.7998 23.0125 27.9123 20.7688C28.0436 18.4563 28.0436 11.5313 27.9123 9.21876ZM24.9248 23.25C24.4373 24.475 23.4936 25.4188 22.2623 25.9125C20.4186 26.6438 16.0436 26.475 14.0061 26.475C11.9686 26.475 7.5873 26.6375 5.7498 25.9125C4.5248 25.425 3.58105 24.4813 3.0873 23.25C2.35605 21.4063 2.5248 17.0313 2.5248 14.9938C2.5248 12.9563 2.3623 8.57501 3.0873 6.73751C3.5748 5.51251 4.51855 4.56876 5.7498 4.07501C7.59355 3.34376 11.9686 3.51251 14.0061 3.51251C16.0436 3.51251 20.4248 3.35001 22.2623 4.07501C23.4873 4.56251 24.4311 5.50626 24.9248 6.73751C25.6561 8.58126 25.4873 12.9563 25.4873 14.9938C25.4873 17.0313 25.6561 21.4125 24.9248 23.25Z" fill="#01D6A3"/>
</svg>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.5 16C31.5 7.4375 24.5625 0.5 16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 23.7362 6.16813 30.1488 13.5781 31.3125V20.4806H9.64062V16H13.5781V12.585C13.5781 8.70062 15.8906 6.555 19.4325 6.555C21.1287 6.555 22.9025 6.8575 22.9025 6.8575V10.67H20.9475C19.0225 10.67 18.4219 11.865 18.4219 13.0906V16H22.7206L22.0331 20.4806H18.4219V31.3125C25.8319 30.1488 31.5 23.7362 31.5 16Z" fill="#01D6A3"/>
</svg>
<svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.0577 21.9125C30.8469 21.339 30.4452 21.0321 29.9882 20.7779C29.9022 20.7276 29.8231 20.6873 29.7557 20.6562C29.6193 20.5858 29.4798 20.5175 29.341 20.4454C27.916 19.6898 26.803 18.7366 26.0311 17.6067C25.8119 17.2886 25.6218 16.9514 25.463 16.5992C25.3972 16.4109 25.4005 16.3039 25.4475 16.2062C25.4944 16.131 25.5564 16.0663 25.6297 16.0164C25.8745 15.8544 26.1272 15.6901 26.2984 15.5793C26.6037 15.3817 26.8455 15.2251 27.0013 15.1143C27.5864 14.7051 27.9956 14.2706 28.2513 13.7844C28.4298 13.4487 28.5339 13.0785 28.5565 12.699C28.5792 12.3195 28.5198 11.9395 28.3825 11.585C27.995 10.5651 27.0317 9.93194 25.8646 9.93194C25.6184 9.93173 25.3729 9.95771 25.1322 10.0094C25.0679 10.0234 25.0035 10.0381 24.9408 10.0544C24.9517 9.35694 24.9362 8.62069 24.8742 7.89606C24.654 5.34869 23.762 4.01337 22.832 2.94856C22.2366 2.28128 21.5352 1.71675 20.756 1.27769C19.3445 0.471688 17.7442 0.0625 15.9998 0.0625C14.2554 0.0625 12.6623 0.471688 11.2498 1.27769C10.4687 1.71689 9.76583 2.28254 9.16973 2.95163C8.23974 4.0165 7.34773 5.35412 7.12767 7.89919C7.06567 8.62381 7.05017 9.36387 7.06024 10.0575C6.99774 10.0413 6.93392 10.0262 6.86955 10.0126C6.62889 9.9608 6.3834 9.93482 6.13723 9.93506C4.9693 9.93506 4.00442 10.5683 3.61848 11.5881C3.48055 11.9428 3.42057 12.323 3.44264 12.7029C3.4647 13.0828 3.56829 13.4536 3.74636 13.7899C4.00292 14.2758 4.41211 14.7106 4.99723 15.1197C5.15224 15.2282 5.3948 15.3847 5.70011 15.5847C5.86517 15.6917 6.10636 15.8482 6.34261 16.0047C6.42533 16.0582 6.49565 16.1288 6.54886 16.2117C6.59848 16.3132 6.59999 16.4225 6.52636 16.6242C6.36978 16.969 6.18279 17.2991 5.96761 17.6108C5.2128 18.7151 4.13242 19.6513 2.75299 20.4007C2.02199 20.788 1.2623 21.0469 0.94161 21.9188C0.69986 22.5768 0.857922 23.3254 1.47249 23.9562C1.69804 24.1917 1.95964 24.3898 2.24749 24.5429C2.84638 24.8721 3.48322 25.1268 4.14386 25.3016C4.28021 25.3368 4.40966 25.3947 4.52674 25.4729C4.75067 25.669 4.71892 25.9642 5.0173 26.3967C5.16706 26.6202 5.35736 26.8137 5.57836 26.9671C6.20455 27.3996 6.90823 27.4267 7.6538 27.4553C8.3273 27.4809 9.09061 27.5104 9.96249 27.7979C10.3236 27.9172 10.6987 28.1482 11.1335 28.4179C12.1774 29.0594 13.6065 29.9375 15.9981 29.9375C18.3897 29.9375 19.8289 29.0548 20.8805 28.4107C21.3122 28.1458 21.685 27.917 22.036 27.8009C22.9079 27.5126 23.6712 27.4839 24.3447 27.4583C25.0902 27.4296 25.7939 27.4025 26.4201 26.9701C26.6819 26.7876 26.9 26.5494 27.0587 26.2726C27.2734 25.9076 27.268 25.6526 27.4695 25.4744C27.5793 25.3999 27.7008 25.3443 27.829 25.3101C28.4987 25.1347 29.1442 24.8775 29.751 24.5444C30.0568 24.3803 30.3321 24.1648 30.5647 23.9073L30.5725 23.898C31.1491 23.2812 31.294 22.5542 31.0577 21.9125ZM28.9319 23.0548C27.6353 23.7709 26.7735 23.6942 26.1032 24.1259C25.5335 24.4924 25.8707 25.2829 25.4568 25.5681C24.9484 25.9192 23.4457 25.5431 21.5044 26.1842C19.9032 26.7136 18.8818 28.2356 16.002 28.2356C13.1222 28.2356 12.1247 26.7169 10.4972 26.1804C8.55974 25.5394 7.05399 25.9153 6.5448 25.5643C6.13173 25.2791 6.4673 24.4886 5.89848 24.122C5.2273 23.6903 4.36555 23.7671 3.06974 23.0548C2.24436 22.5991 2.71249 22.3173 2.98761 22.1838C7.68405 19.9099 8.43342 16.3993 8.46673 16.1388C8.50705 15.8234 8.55198 15.5754 8.2048 15.2546C7.86923 14.9446 6.38049 14.0233 5.9673 13.7348C5.28374 13.2574 4.98305 12.7808 5.2048 12.1949C5.3598 11.7896 5.73798 11.6369 6.13473 11.6369C6.26016 11.6373 6.38516 11.6514 6.50755 11.6788C7.25755 11.8413 7.98624 12.2174 8.40705 12.3189C8.45772 12.3319 8.50974 12.339 8.56205 12.3399C8.78705 12.3399 8.8658 12.2267 8.8503 11.9694C8.8023 11.1487 8.68605 9.54913 8.81542 8.05419C8.99292 5.99738 9.65555 4.97825 10.4429 4.07694C10.8211 3.64369 12.5982 1.76594 15.9965 1.76594C19.3948 1.76594 21.1765 3.63594 21.5547 4.06763C22.3429 4.96894 23.0062 5.98806 23.1822 8.04488C23.3116 9.53981 23.2 11.1402 23.1473 11.9601C23.1295 12.2306 23.2109 12.3306 23.4356 12.3306C23.4879 12.3297 23.5399 12.3227 23.5906 12.3096C24.0122 12.2081 24.7406 11.8323 25.4906 11.6695C25.613 11.6421 25.738 11.628 25.8634 11.6276C26.2625 11.6276 26.6384 11.7826 26.7934 12.1856C27.015 12.7715 26.7159 13.2481 26.0315 13.7256C25.6185 14.0138 24.1297 14.9345 23.794 15.2453C23.446 15.5661 23.4918 15.814 23.5321 16.1296C23.5654 16.3938 24.314 19.9046 29.0112 22.1744C29.2891 22.3132 29.7572 22.5953 28.9319 23.0548Z" fill="#01D6A3"/>
</svg>
</FooterP>
    </div>
    
    <Footerdiv>
    <FooterLink href="#about">HOME</FooterLink>
    <FooterLink href="#services">DEALS</FooterLink>
    <FooterLink href="#contact">BUY NOW</FooterLink>
    <FooterLink href="#contact">CONNECT</FooterLink> 
    </Footerdiv>
    <FooterP><svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9444 0.111084C19.6927 0.111084 21.1111 1.52883 21.1111 3.27775V24.3757C18.591 25.7875 16.8889 28.4791 16.8889 31.5732C16.8889 32.4243 17.1264 33.2159 17.542 33.8889H3.16667C1.41774 33.8889 0 32.4705 0 30.7222V25.4444H9.5C10.0806 25.4444 10.5556 24.9694 10.5556 24.3889C10.5556 23.8083 10.0806 23.3333 9.5 23.3333H0V19.1111H9.5C10.0806 19.1111 10.5556 18.6361 10.5556 18.0555C10.5556 17.475 10.0806 17 9.5 17H0V3.27775C0 1.52883 1.41774 0.111084 3.16667 0.111084H17.9444ZM10.0278 4.33331C9.44722 4.33331 8.97222 4.80567 8.97222 5.38886V6.9722H7.38889C6.80833 6.9722 6.33333 7.4472 6.33333 8.02775V9.08331C6.33333 9.66386 6.80833 10.1389 7.38889 10.1389H8.97222V11.7222C8.97222 12.3028 9.44722 12.7778 10.0278 12.7778H11.0833C11.6639 12.7778 12.1389 12.3028 12.1389 11.7222V10.1389H13.7222C14.3028 10.1389 14.7778 9.66386 14.7778 9.08331V8.02775C14.7778 7.4472 14.3028 6.9722 13.7222 6.9722H12.1389V5.38886C12.1389 4.80567 11.6639 4.33331 11.0833 4.33331H10.0278ZM33.7778 18.0555C33.7778 20.9715 31.416 23.3333 28.5 23.3333C25.584 23.3333 23.2222 20.9715 23.2222 18.0555C23.2222 15.1396 25.584 12.7778 28.5 12.7778C31.416 12.7778 33.7778 15.1396 33.7778 18.0555ZM19 31.5864C19 28.1955 21.751 25.4444 25.142 25.4444H31.858C35.249 25.4444 38 28.1955 38 31.5864C38 32.8597 36.9708 33.8889 35.6976 33.8889H21.3024C20.0292 33.8889 19 32.8597 19 31.5864Z" fill="white"/>
</svg>
<svg width="69" height="46" viewBox="0 0 69 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.62 18V6.192H3.42L5.688 12.492C5.832 12.9 5.97 13.314 6.102 13.734C6.246 14.142 6.39 14.55 6.534 14.958H6.606C6.75 14.55 6.882 14.142 7.002 13.734C7.134 13.314 7.272 12.9 7.416 12.492L9.648 6.192H11.466V18H10.062V11.502C10.062 10.974 10.086 10.392 10.134 9.756C10.182 9.108 10.224 8.526 10.26 8.01H10.188L9.252 10.692L7.02 16.812H6.03L3.798 10.692L2.862 8.01H2.79C2.826 8.526 2.862 9.108 2.898 9.756C2.946 10.392 2.97 10.974 2.97 11.502V18H1.62ZM14.6981 18V6.192H21.5021V7.452H16.1921V11.16H20.6741V12.438H16.1921V16.722H21.6821V18H14.6981ZM24.1903 18V6.192H27.1423C28.9663 6.192 30.3523 6.702 31.3003 7.722C32.2483 8.73 32.7223 10.17 32.7223 12.042C32.7223 13.926 32.2483 15.39 31.3003 16.434C30.3643 17.478 29.0023 18 27.2143 18H24.1903ZM25.6843 16.776H27.0343C28.4143 16.776 29.4463 16.362 30.1303 15.534C30.8263 14.694 31.1743 13.53 31.1743 12.042C31.1743 10.554 30.8263 9.414 30.1303 8.622C29.4463 7.818 28.4143 7.416 27.0343 7.416H25.6843V16.776ZM35.2645 18V6.192H36.7585V18H35.2645ZM44.457 18.216C43.473 18.216 42.591 17.976 41.811 17.496C41.043 17.004 40.431 16.302 39.975 15.39C39.531 14.478 39.309 13.38 39.309 12.096C39.309 10.824 39.537 9.732 39.993 8.82C40.449 7.908 41.073 7.206 41.865 6.714C42.657 6.222 43.551 5.976 44.547 5.976C45.267 5.976 45.903 6.126 46.455 6.426C47.007 6.714 47.451 7.05 47.787 7.434L46.977 8.406C46.665 8.07 46.311 7.8 45.915 7.596C45.519 7.392 45.069 7.29 44.565 7.29C43.821 7.29 43.167 7.488 42.603 7.884C42.051 8.268 41.619 8.814 41.307 9.522C41.007 10.23 40.857 11.076 40.857 12.06C40.857 13.044 41.007 13.902 41.307 14.634C41.607 15.354 42.027 15.912 42.567 16.308C43.119 16.704 43.767 16.902 44.511 16.902C45.075 16.902 45.579 16.782 46.023 16.542C46.467 16.302 46.875 15.978 47.247 15.57L48.075 16.506C47.607 17.046 47.079 17.466 46.491 17.766C45.903 18.066 45.225 18.216 44.457 18.216ZM52.3103 11.394L51.7523 13.194H55.2983L54.7403 11.394C54.5243 10.734 54.3203 10.08 54.1283 9.432C53.9363 8.772 53.7443 8.1 53.5523 7.416H53.4803C53.3003 8.1 53.1143 8.772 52.9223 9.432C52.7303 10.08 52.5263 10.734 52.3103 11.394ZM48.7103 18L52.7063 6.192H54.3983L58.3943 18H56.7923L55.6763 14.4H51.3743L50.2403 18H48.7103ZM60.0673 18V6.192H63.7573C64.5613 6.192 65.2753 6.3 65.8993 6.516C66.5233 6.72 67.0093 7.068 67.3573 7.56C67.7173 8.04 67.8973 8.688 67.8973 9.504C67.8973 10.416 67.6573 11.154 67.1773 11.718C66.6973 12.27 66.0493 12.648 65.2333 12.852L68.2393 18H66.5473L63.7033 13.014H61.5613V18H60.0673ZM61.5613 11.79H63.5413C64.4653 11.79 65.1733 11.604 65.6653 11.232C66.1573 10.848 66.4033 10.272 66.4033 9.504C66.4033 8.724 66.1573 8.178 65.6653 7.866C65.1733 7.554 64.4653 7.398 63.5413 7.398H61.5613V11.79Z" fill="white"/>
<path d="M1.62 41V29.192H8.424V30.452H3.114V34.16H7.596V35.438H3.114V39.722H8.604V41H1.62ZM14.7157 41V29.192H16.2097V34.142H21.6997V29.192H23.2117V41H21.6997V35.438H16.2097V41H14.7157ZM30.6519 41.216C29.8479 41.216 29.1219 41.054 28.4739 40.73C27.8379 40.406 27.3339 39.872 26.9619 39.128C26.5899 38.384 26.4039 37.382 26.4039 36.122V29.192H27.8979V36.158C27.8979 37.106 28.0179 37.856 28.2579 38.408C28.5099 38.948 28.8399 39.332 29.2479 39.56C29.6679 39.788 30.1359 39.902 30.6519 39.902C31.1799 39.902 31.6539 39.788 32.0739 39.56C32.4939 39.332 32.8239 38.948 33.0639 38.408C33.3159 37.856 33.4419 37.106 33.4419 36.158V29.192H34.8819V36.122C34.8819 37.382 34.6959 38.384 34.3239 39.128C33.9519 39.872 33.4479 40.406 32.8119 40.73C32.1759 41.054 31.4559 41.216 30.6519 41.216ZM38.0595 41V29.192H41.5695C42.3735 29.192 43.0755 29.288 43.6755 29.48C44.2875 29.672 44.7615 29.978 45.0975 30.398C45.4455 30.818 45.6195 31.376 45.6195 32.072C45.6195 32.66 45.4695 33.194 45.1695 33.674C44.8815 34.142 44.4555 34.466 43.8915 34.646V34.718C44.5995 34.85 45.1755 35.15 45.6195 35.618C46.0755 36.086 46.3035 36.728 46.3035 37.544C46.3035 38.312 46.1115 38.954 45.7275 39.47C45.3555 39.986 44.8335 40.37 44.1615 40.622C43.4895 40.874 42.7095 41 41.8215 41H38.0595ZM39.5535 34.214H41.2995C42.3075 34.214 43.0335 34.04 43.4775 33.692C43.9215 33.344 44.1435 32.87 44.1435 32.27C44.1435 31.586 43.9095 31.1 43.4415 30.812C42.9855 30.524 42.2955 30.38 41.3715 30.38H39.5535V34.214ZM39.5535 39.812H41.6055C42.6255 39.812 43.4175 39.626 43.9815 39.254C44.5455 38.87 44.8275 38.282 44.8275 37.49C44.8275 36.758 44.5455 36.224 43.9815 35.888C43.4295 35.54 42.6375 35.366 41.6055 35.366H39.5535V39.812Z" fill="white"/>
</svg>
</FooterP>
</Container>
      
  </>

    );
};
