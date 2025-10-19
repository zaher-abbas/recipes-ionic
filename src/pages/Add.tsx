import {
    IonButton, IonButtons, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonNote,
    IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea,
    IonTitle,
    IonToolbar

} from '@ionic/react';
import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {getRecipes, Recipe, saveRecipe} from "../data/Storage";
import {useDarkMode} from "../hooks/useDarkMode";
import {moon, sunny} from "ionicons/icons";

const Add: React.FC = () => {
    const history = useHistory();
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const [error, setError] = useState<Boolean>(false);
    const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
    const {isDark, toggleDarkMode} = useDarkMode();


    async function submit (e: React.FormEvent) {
        e.preventDefault();

        const addedRecipe: Recipe = {
            id: Number(new Date().getTime()),
            title: title.trim(),
            image: image.trim(),
            difficulty: difficulty,
            duration: duration,
            ingredients: ingredients,
            steps: steps
        };
        if (!difficulty){
            setError(true);
            return;
        }
        const recipes: Recipe[] = await getRecipes();
        const newRecipes = [addedRecipe, ...recipes];
        await saveRecipe(newRecipes);
        history.push('/home');
        return;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>🍴 Add A New Recipe</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={toggleDarkMode}
                            aria-label={isDark ? 'Deactivate Dark Mode' : 'Activate Dark Mode'}
                        >
                            <IonIcon slot="icon-only" icon={isDark ? sunny : moon} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="12" sizeLg="10" sizeXl="8">
                            <form onSubmit={submit}>
                                <IonList inset>
                                    <IonItem>
                                        <IonLabel position="stacked">Title</IonLabel>
                                        <IonInput
                                            value={title}
                                            type="text"
                                            onIonChange={(e) => setTitle(e.detail.value || '')}
                                            required
                                            minlength={2}
                                            placeholder="e.g. French Soupe"
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Image URL</IonLabel>
                                        <IonInput
                                            type="text"
                                            value={image}
                                            onIonChange={(e) => setImage(e.detail.value || '')}
                                            required
                                            placeholder="e.g. www.example.com/image.jpg"
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonSelect
                                            label="Difficulty"
                                            labelPlacement="stacked"
                                            value={difficulty}
                                            onIonChange={(e) => setDifficulty(e.detail.value)}
                                            required
                                            placeholder="Select a difficulty"
                                            name="difficulty"
                                        >
                                            {DIFFICULTIES.map((d) => (
                                                <IonSelectOption key={d} value={d}>
                                                    {d}
                                                </IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    </IonItem>
                                    {error && <IonNote color="danger" className="ion-margin-start">Please select a
                                        difficulty!</IonNote>}
                                    <IonItem>
                                        <IonLabel position="stacked">Duration</IonLabel>
                                        <IonInput
                                            type="number"
                                            value={duration}
                                            onIonChange={(e) => setDuration(Number(e.detail.value))}
                                            required
                                            name="duration"
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Ingredients (one per line)</IonLabel>
                                        <IonTextarea
                                            value={ingredients.join('\n')}
                                            onIonChange={(e) =>
                                                setIngredients(
                                                    (e.detail.value || '')
                                                        .split(/\r?\n/)
                                                        .map(s => s.trim())
                                                        .filter(Boolean)
                                                )
                                            }
                                            autoGrow
                                            rows={4}
                                            required
                                            name="ingredients"
                                            placeholder="2 eggs
200 g flour
1 tsp salt"
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Steps (one per line)</IonLabel>
                                        <IonTextarea
                                            value={steps.join('\n')}
                                            onIonChange={(e) =>
                                                setSteps(
                                                    (e.detail.value || '')
                                                        .split(/\r?\n/)
                                                        .map(s => s.trim())
                                                        .filter(Boolean)
                                                )
                                            }
                                            autoGrow
                                            required
                                            rows={6}
                                            name="steps"
                                            placeholder="Preheat oven to 180°C
Mix dry ingredients
Whisk in eggs"
                                        />
                                    </IonItem>

                                </IonList>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="6">
                                            <IonButton color="success" expand="block" type="submit">
                                                Add
                                            </IonButton>
                                        </IonCol>
                                        <IonCol size="6">
                                            <IonButton color="danger" expand="block" type="button" onClick={() =>{
                                                setError(false);
                                                history.push('/home');}}>
                                                Cancel
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>

                                </IonGrid>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Add;