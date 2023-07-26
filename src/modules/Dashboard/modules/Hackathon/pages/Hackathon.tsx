import { Link, useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { LuCopy, LuShare2, LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { DateConverter } from "../../../utils/common";
import {
    deleteHackathon,
    getHackathons,
    publishHackathon
} from "../services/HackathonApis";
import { useToast } from "@chakra-ui/react";
import { BsPersonAdd } from "react-icons/bs";
import Modal from "@/MuLearnComponents/Modal/Modal";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { HackList } from "../services/HackathonInterfaces";
import styles from "./HackathonCreate.module.css";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

enum ModalType {
    Publish,
    Delete
}

const Hackathon = () => {
    const [data, setData] = useState<HackList[]>([]);
    const [ownData, setOwnData] = useState<HackList[]>([]);
    const [isPublishOpen, setIsPublishOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getHackathons(setData);
    }, []);

    const toggleModal = (index: number, type: string) => {
        if (type == ModalType[0]) {
            setIsPublishOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        } else {
            setIsDeleteOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    return (
        <div className={styles.HCHackathon}>
            <Link to="/dashboard/hackathon/create">
                <PowerfulButton text="Create" />
            </Link>

            <div className={styles.hackathonHeading}>
                <h1>Own Hackathons</h1>
            </div>

            <div className={styles.hackathonBox}>
                {data &&
                    data.map((hack, index) => (
                        <div key={hack.id} className={styles.cardComponent}>
                            <div className={styles.frame}>
                                <div className={styles.div}>
                                    <div className={styles.title}>
                                        <b className={styles.textWrapper}>
                                            {hack.title}
                                        </b>
                                        <div className={styles.textWrapper2}>
                                            {hack.tagline}
                                        </div>
                                    </div>
                                    <div className={styles.shared}>
                                        {hack.editable ? (
                                            <div className={styles.frame2}>
                                                <div>
                                                    <div className={styles.group}>
                                                        <Link
                                                            to={`/dashboard/hackathon/edit/${hack.id}`}
                                                        >
                                                            <LuEdit
                                                                data-tooltip-id="Icon"
                                                                data-tooltip-content="Edit"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className={styles.group} >
                                                        <Link
                                                            to={`/dashboard/hackathon/organizers/${hack.id}`}
                                                        >
                                                            <BsPersonAdd
                                                                data-tooltip-id="Icon"
                                                                data-tooltip-content="Add Organizer"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={styles.group}>
                                                        <RiDeleteBin5Line
                                                            data-tooltip-id="Icon"
                                                            data-tooltip-content="Delete"
                                                            onClick={() => {
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                );
                                                            }}
                                                        />
                                                        {isDeleteOpen[
                                                            index
                                                        ] && (
                                                                <Modal
                                                                    setIsOpen={() =>
                                                                        toggleModal(
                                                                            index,
                                                                            ModalType[1]
                                                                        )
                                                                    }
                                                                    id={hack.id}
                                                                    heading={
                                                                        "Delete"
                                                                    }
                                                                    content={`Are you sure you want to delete ${hack.title} ?`}
                                                                    click={() => {
                                                                        deleteHackathon(
                                                                            hack.id,
                                                                            toast
                                                                        );
                                                                        setTimeout(
                                                                            () => {
                                                                                getHackathons(
                                                                                    setOwnData
                                                                                );
                                                                                getHackathons(
                                                                                    setData
                                                                                );
                                                                            },
                                                                            1000
                                                                        );
                                                                        setTimeout(
                                                                            () => {
                                                                                navigate(
                                                                                    "/dashboard/hackathon"
                                                                                );
                                                                            },
                                                                            1000
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                    </div>
                                                    <div
                                                        className={styles.group}
                                                    >
                                                        {hack.status ===
                                                            "Draft" ? (
                                                            <MdPublishedWithChanges
                                                                data-tooltip-id="Icon"
                                                                data-tooltip-content="Publish"
                                                                onClick={() => {
                                                                    toggleModal(
                                                                        index,
                                                                        ModalType[0]
                                                                    );
                                                                }}
                                                            />
                                                        ) : (
                                                            <MdOutlineUnpublished
                                                                data-tooltip-id="Icon"
                                                                data-tooltip-content="Change to Draft"
                                                                onClick={() => {
                                                                    toggleModal(
                                                                        index,
                                                                        ModalType[0]
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                        {isPublishOpen[
                                                            index
                                                        ] && (
                                                                <Modal
                                                                    setIsOpen={() =>
                                                                        toggleModal(
                                                                            index,
                                                                            ModalType[0]
                                                                        )
                                                                    }
                                                                    id={hack.id}
                                                                    heading={
                                                                        hack.status ===
                                                                            "Draft"
                                                                            ? "Publish"
                                                                            : "Draft"
                                                                    }
                                                                    content={
                                                                        hack.status ===
                                                                            "Draft"
                                                                            ? `Make sure all details are filled before Publishing ${hack.title}`
                                                                            : `Are you sure you want to set ${hack.title} to Draft`
                                                                    }
                                                                    click={() => {
                                                                        publishHackathon(
                                                                            hack.id,
                                                                            hack.status,
                                                                            toast
                                                                        );
                                                                        setTimeout(
                                                                            () => {
                                                                                getHackathons(
                                                                                    setOwnData
                                                                                );
                                                                                getHackathons(
                                                                                    setData
                                                                                );
                                                                            },
                                                                            1000
                                                                        );
                                                                        setTimeout(
                                                                            () => {
                                                                                navigate(
                                                                                    "/dashboard/hackathon"
                                                                                );
                                                                            },
                                                                            2000
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.frame2}>
                                                <div className={styles.group}>
                                                    <LuCopy />
                                                </div>
                                                <div className={styles.group}>
                                                    <LuShare2 />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Tooltip
                                        id="Icon"
                                        style={{
                                            backgroundColor: "var(--blue)",
                                            color: "var(--White)",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </div>
                                <div className={styles.group2}>
                                    <div className={styles.textWrapper3}>
                                        Application Date
                                    </div>
                                    <div className={styles.overlapGroup}>
                                        <div className={styles.textWrapper4}>
                                            {hack.application_start
                                                ? DateConverter(
                                                    hack.application_start
                                                )
                                                : "No Date"}
                                        </div>
                                        {/* <div className={styles.rectangle} /> */}
                                        <div className={styles.textWrapper4}>
                                            {hack.application_ends
                                                ? DateConverter(
                                                    hack.application_ends
                                                )
                                                : "No Date"}
                                        </div>
                                        {/* <div className={styles.rectangle} /> */}
                                        {/* <div className={styles.rectangle} /> */}
                                    </div>
                                </div>
                                <div className={styles.frame3}>
                                    <div className={styles.frame4}>
                                        <div className={styles.mode}>
                                            <div className={styles.textWrapperSmall}>
                                                {/* coverting first letter to UpperCase */}
                                                {hack.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    hack.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className={styles.date}>
                                            <div className={styles.textWrapperSmall}>
                                                {hack.event_start
                                                    ? DateConverter(
                                                        hack.event_start
                                                    )
                                                    : "No Date"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.buttonWrapper}>
                                        <Link
                                            to={`/dashboard/hackathon/details/${hack.id}`}
                                        >
                                            <button
                                                className={styles.hackathonBtn}
                                            >
                                                Apply Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Hackathon;
