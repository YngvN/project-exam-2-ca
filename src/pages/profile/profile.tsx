import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import icon from "../../iconBack.png";
import { baseUrl } from "../../utility/actions/api/api.url";
import { UserData } from "../../utility/type";

// interface UserData {
//     data: {
//         name: string;
//         email: string;
//         bio?: string;
//         avatar?: {
//             url: string;
//             alt: string;
//         };
//         banner?: {
//             url: string;
//             alt: string;
//         };
//         venueManager: boolean;
//         accessToken: string;

//     }
//     apiKey: {
//         name: string;
//         status: string;
//         key: string;
//     };
// }


function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [venueManager, setVenueManager] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData') || localStorage.getItem('userData');
        if (userDataString) {
            try {
                const userDataObj: UserData = JSON.parse(userDataString);
                setUserData(userDataObj);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (userData) {
            setName(userData.data.name || '');
            setEmail(userData.data.email || '');
            setBio(userData.data.bio || '');
            setAvatarUrl(userData.data.avatar ? userData.data.avatar.url : '');
            setBannerUrl(userData.data.banner ? userData.data.banner.url : '');
            setVenueManager(userData.data.venueManager || false);
        }
    }, [userData]);



    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updateData = {
            bio,
            avatar: {
                url: avatarUrl,
            },
            banner: {
                url: bannerUrl,
            },
            venueManager
        };
        if (!userData || !userData.data) {
            console.error("User data is null or missing.");
            return;
        }



        const accessToken = userData.data.accessToken;
        const apiKey = userData.apiKey.key;
        console.log(apiKey);



        try {
            console.log(accessToken);

            const url = `${baseUrl}holidaze/profiles/${userData.data.name}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Noroff-API-Key': apiKey
                },
                body: JSON.stringify(updateData)
            });

            console.log(url);
            console.log('Response status:', response.status);

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage("Profile updated successfully!");
                setIsUpdating(false);
            } else {
                throw new Error('Failed to update the profile');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setSuccessMessage("Error updating profile.");
        }
    };



    return (
        <div>
            <h1>Profile</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {userData && (
                <div>
                    <div className="image-container">
                        {userData.data.banner && (
                            <img src={userData.data.banner.url} alt={userData.data.banner.alt} className="banner-image" />
                        )}
                        {userData.data.avatar && (
                            <img src={userData.data.avatar.url} alt={userData.data.avatar.alt} className="profile-image" />
                        )}
                    </div>
                    <Row className="profile-name-container">
                        <button onClick={() => navigate(-1)} className="btn btn-back">
                            <img src={icon} alt="Icon back" className="icon" />
                            Back
                        </button>
                        <h2 style={{ textAlign: 'center' }}>{userData.data.name}</h2>
                    </Row>
                    {!isUpdating && (
                        <Col className="profile-info-container">
                            <div>
                                <h3>Email:</h3>
                                <p> {userData.data.email}</p>
                            </div>
                            <div>
                                <h3>Bio:</h3>
                                <p> {userData.data.bio}</p>
                            </div>
                            <div>
                                <button onClick={() => setIsUpdating(true)} className="btn btn-primary">Update profile</button>
                            </div>
                        </Col>
                    )}
                    {isUpdating && (
                        <Form onSubmit={handleUpdateProfile}>
                            <FloatingLabel controlId="formAvatarUrl" label="Avatar URL" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="https://example.com/avatar.jpg"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="formBannerUrl" label="Banner URL" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="https://example.com/banner.jpg"
                                    value={bannerUrl}
                                    onChange={(e) => setBannerUrl(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="formBio" label="Bio" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Bio"
                                    rows={5}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </FloatingLabel>

                            <Form.Group className="mb-3" controlId="formVenueManager">
                                <Form.Check
                                    type="checkbox"
                                    label="Venue Manager"
                                    checked={venueManager}
                                    onChange={(e) => setVenueManager(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                            <Button variant="danger" onClick={() => setIsUpdating(false)}>
                                Cancel
                            </Button>
                        </Form>
                    )}
                </div>
            )}
        </div>
    );

}

export default Profile;
