import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
`;

const StyledHolder = styled.div`
  /* Offset for the image that sticks out on the top */
  padding: 48 0 0 0;
  height: 100%;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledImageHolder = styled.span`
  /* Create outline around image */
  border: 4px solid grey;

  /* Add background, which looks better when images are not loaded yet */
  background-color: grey;

  /* Sizing and shape */
  width: 88px;
  height: 88px;
  border-radius: 50%;

  /* Prevents contents not adhering to round shape */
  overflow: hidden;

  /* Position at the top, centered and 50% overflow on the top */
  position: absolute;
  top: -44px;
  left: calc(50% - 44px;

  /* We make this z transform to fix overflow issues with ios safari */
  transform: translateZ(0);

  /* Transition for hover below */
  transition: border-color 200ms;
`;

const ProfileCard = ({
  id,
  link,
  hook,
  index,
  intro,
  owner,
  company,
  linkText,
  image,
}) => {
  return (
    <StyledHolder>
      <Card key={id} href={link}>
        {/* Absolute position holder for the image */}
        <StyledImageHolder>
          {/* <img src={image.src || ""} alt={image.alt} fillContainer /> */}
        </StyledImageHolder>
        {/* Holder for content, big padding at the top to offset from absolute postioned image */}
        <div width="100%">
          {/* Fill available height and spread top and bottom halves of the content */}
          <Flex
            flexDirection="column"
            height="100%"
            justifyContent="div-between"
          >
            {/* Top part of content */}
            <p textAlign="center">
              <span>{intro}</span>
            </p>
            {/* Bottom part of content */}
            <div>
              <div bottom={8}>
                <p textAlign="center">
                  <span>{owner}</span>
                </p>
              </div>
              <div bottom={24}>
                <p textAlign="center">{company}</p>
              </div>
            </div>
          </Flex>
        </div>
      </Card>
    </StyledHolder>
  );
};

export default ProfileCard;
