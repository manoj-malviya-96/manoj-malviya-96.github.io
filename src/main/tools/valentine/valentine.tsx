import React from "react";
import ToolInfo from "../tool-info";
import AppView from "../app-view";
import AtomStyledContainer from "../../../atoms/atom-styled-container";
import {
  AtomHeroBrandTitleText,
  AtomSuperHeroBrandTitleText,
  AtomTextInput,
  AtomTitleText,
} from "../../../atoms/atom-text";
import {
  AtomColumn,
  AtomRow,
  LayoutGap,
  LayoutSize,
} from "../../../atoms/atom-layout";
import AtomButton, { ButtonSeverity } from "../../../atoms/atom-button";
import AtomImage from "../../../atoms/atom-image";

import Kiss from "./kiss.jpeg";
import Buda from "./budapest.jpeg";
import Proposal from "./proposal.JPG";
import Love from "./love.jpeg";
import Lift from "./lift.jpeg";
import Beat from "./beat.gif";
import HeartBeat from "./heartbeat.gif";
import Logo from "../logos/val.svg";
import AtomDropdown from "../../../atoms/atom-dropdown";
import { sendEmail } from "../../../common/email";
import { useToast } from "../../../providers/toasts";
import { ToastSeverity } from "../../../atoms/atom-toast";

const AppName = "VALENTINE";

interface ModalPageProps {
  content: React.ReactNode;
  acceptText?: string;
  declineText?: string;
  acceptIcon?: string;
  declineIcon?: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ModalPage: React.FC<ModalPageProps> = React.memo(
  ({
    content,
    acceptText,
    declineText,
    acceptIcon,
    declineIcon,
    onAccept,
    onDecline,
  }) => {
    return (
      <AtomStyledContainer
        className={"w-full h-full justify-center items-center"}
      >
        <AtomColumn gap={LayoutGap.Large} size={LayoutSize.FullSize}>
          {content}
          <AtomRow>
            <AtomButton
              label={acceptText}
              icon={acceptIcon}
              severity={ButtonSeverity.Info}
              onClick={onAccept}
            />
            <AtomButton
              label={declineText}
              icon={declineIcon}
              severity={ButtonSeverity.Error}
              onClick={onDecline}
            />
          </AtomRow>
        </AtomColumn>
      </AtomStyledContainer>
    );
  },
);

interface StateProps {
  onAccept: () => void;
  onDecline: () => void;
}

const IntroState: React.FC<StateProps> = ({ onAccept, onDecline }) => {
  return (
    <ModalPage
      content={
        <AtomColumn>
          <AtomTitleText>
            Hi Bee!! I am so glad you are here with me. I have something to tell
            you so much.
          </AtomTitleText>
          <AtomImage src={Beat} alt={"heart beat"} />
          <AtomSuperHeroBrandTitleText>I Love you </AtomSuperHeroBrandTitleText>
        </AtomColumn>
      }
      acceptText={"I love you too"}
      declineText={"I love you more"}
      acceptIcon={"fas fa-heart"}
      declineIcon={"fas fa-heart"}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
};

const HistoryState: React.FC<StateProps> = ({ onAccept, onDecline }) => {
  return (
    <ModalPage
      content={
        <AtomColumn>
          <AtomRow>
            {[Buda, Kiss, Love, Lift, Proposal].map((image, index) => (
              <AtomImage
                key={index}
                src={image}
                alt={"image"}
                className={"w-56 h-56"}
              />
            ))}
          </AtomRow>
          <AtomTitleText className={"w-2/3 text-center"}>
            I have been thinking about you all day. I am so happy to have you
            <AtomHeroBrandTitleText> in my life.</AtomHeroBrandTitleText>
          </AtomTitleText>
          <AtomImage
            src={HeartBeat}
            alt={"HeartBeat"}
            className={"w-52 h-52"}
          />
        </AtomColumn>
      }
      acceptText={"Me too"}
      declineText={"Stop Saying that"}
      acceptIcon={"fas fa-heart"}
      declineIcon={"fas fa-heart"}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
};

const AskOutState: React.FC<StateProps> = ({ onAccept, onDecline }) => {
  return (
    <ModalPage
      content={
        <AtomSuperHeroBrandTitleText className={"w-full text-center"}>
          Will you be my Valentine?
        </AtomSuperHeroBrandTitleText>
      }
      acceptText={"Yes"}
      declineText={"Yes, What are we doing?"}
      acceptIcon={"fas fa-heart"}
      declineIcon={"fas fa-heart"}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
};

const WhatAreWeDoingState = () => {
  const [dinner, setDinner] = React.useState<string>("Eat Out Pizza");
  const [activity, setActivity] = React.useState<string>("Watching Movie");
  const [postAct, setPostAct] = React.useState<string>("setPostAct");
  const [specialRequest, setSpecialRequest] = React.useState<string>("");
  const [submit, setSubmit] = React.useState<boolean>(false);
  const { addToast } = useToast();

  const onSubmit = () => {
    const msg = `Confirming details: We are going to ${activity} and then ${dinner} and then some ${postAct}.
              Special Request: ${specialRequest}`;
    sendEmail(msg, "Manoj", "malviyamanoj1896@gmail.com")
      .then((result) => {
        console.log(result);
        setSubmit(false);
        addToast("Email Sent", ToastSeverity.Success);
      })
      .catch((error) => {
        addToast(`Email not sent ${error.text}`, ToastSeverity.Error);
        setSubmit(false);
      });
  };

  return (
    <AtomStyledContainer
      scrollable={false}
      className={"w-full h-full justify-center items-center"}
    >
      {!submit && (
        <AtomColumn size={LayoutSize.FullWidth}>
          <AtomHeroBrandTitleText>
            Lets spend time together on Feb 14
          </AtomHeroBrandTitleText>
          <AtomRow>
            <AtomTitleText>I am thinking of</AtomTitleText>
            <AtomDropdown
              placeholder="date ideas"
              initialIndex={-1}
              dropdownIcon={"fa-brands fa-gratipay"}
              options={[
                {
                  label: "Watching Movie",
                  value: "Watching Movie",
                },
                {
                  label: "Go Bowling",
                  value: "Go Bowling",
                },
                {
                  label: "Visit Postdam",
                  value: "Visit Postdam",
                },
              ]}
              onClick={(value) => setActivity(value)}
            />
          </AtomRow>
          <AtomRow>
            <AtomTitleText>After that, we </AtomTitleText>
            <AtomDropdown
              placeholder="dinner ideas"
              initialIndex={-1}
              dropdownIcon={"fas fa-utensils"}
              options={[
                {
                  label: "Eat Out Pizza",
                  value: "Eat Out Pizza",
                },
                {
                  label: "We bake pizza together",
                  value: "We bake pizza together",
                },
              ]}
              onClick={(value) => setDinner(value)}
            />
          </AtomRow>
          <AtomRow>
            <AtomTitleText>And then we :P</AtomTitleText>
            <AtomDropdown
              placeholder="...."
              initialIndex={-1}
              dropdownIcon={"fas fa-heart-circle-bolt"}
              options={[
                {
                  label: "Niagra falls",
                  value: "Niagra falls",
                },
                {
                  label: "Cuddle",
                  value: "Cuddle",
                },
              ]}
              onClick={(value) => setPostAct(value)}
            />
          </AtomRow>
          <AtomRow>
            <AtomTitleText> And any special request </AtomTitleText>
            <AtomTextInput
              text={specialRequest}
              placeholder={"Special Request"}
              onChange={setSpecialRequest}
            />
          </AtomRow>
          <AtomButton
            label={"Submit"}
            severity={ButtonSeverity.Info}
            onClick={onSubmit}
          />
        </AtomColumn>
      )}
      {submit && (
        <AtomHeroBrandTitleText>
          Manosha got the msg, LOVE U BEE
        </AtomHeroBrandTitleText>
      )}
    </AtomStyledContainer>
  );
};

enum State {
  Intro,
  History,
  AskOut,
  WhatAreWeDoing,
}

const ValentineView = () => {
  const [state, setState] = React.useState<State>(State.Intro);

  return (
    <AppView appName={AppName} appLogo={Logo}>
      {state === State.Intro && (
        <IntroState
          onAccept={() => {
            setState(State.History);
          }}
          onDecline={() => setState(State.Intro)}
        />
      )}
      {state === State.History && (
        <HistoryState
          onAccept={() => setState(State.AskOut)}
          onDecline={() => {
            setState(State.AskOut);
          }}
        />
      )}
      {state === State.AskOut && (
        <AskOutState
          onAccept={() => {
            setState(State.WhatAreWeDoing);
          }}
          onDecline={() => {
            setState(State.WhatAreWeDoing);
          }}
        />
      )}
      {state === State.WhatAreWeDoing && <WhatAreWeDoingState />}
    </AppView>
  );
};

class Valentine extends ToolInfo {
  constructor() {
    super({
      id: "valentine",
      name: AppName,
      description: "i wanna ask you out :) ",
      cover: Logo,
      componentConstructor: () => <ValentineView />,
    });
  }
}

export default Valentine;
